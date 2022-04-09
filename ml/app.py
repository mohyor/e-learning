'''
ratings = ratings.map(lambda x: { "movie_title": x["movie_title"], "user_id": x["user_id"]})
movies = movies.map(lambda x: x["movie_title"])
'''
courses = courses.map(lambda x: { "course_name": x["name"], "rating": x["ratings"]})
users = users.map(lambda x: {"name": x["name"], "courses": x["courses"],})

'''
tf.random.set_seed(42)
shuffled = ratings.shuffle(100_000, seed=42, reshuffle_each_iteration=False)

train = shuffled.take(80_000)
test = shuffled.skip(80_000).take(20_000)
'''
tf.random.set_seed(42)
shuffled = courses.shuffle(100_000, seed=42, reshuffle_each_iteration=False)

train = shuffled.take(80_000)
test = shuffled.skip(80_000).take(20_000)

'''
movie_titles = movies.batch(1_000)
user_ids = ratings.batch(1_000_000).map(lambda x: x["user_id"])

unique_movie_titles = np.unique(np.concatenate(list(movie_titles)))
unique_user_ids = np.unique(np.concatenate(list(user_ids)))

unique_movie_titles[:10]
'''
course_titles = courses.batch(1_000)
user_ids = users.batch(1_000_000).map(lambda x: x["_id"])

unique_course_titles = np.unique(np.concatenate(list(course_titles)))
unique_user_ids = np.unique(np.concatenate(list(user_ids)))

unique_course_titles[:4]

embedding_dimension = 32

user_model = tf.keras.Sequential([
  tf.keras.layers.StringLookup(
      vocabulary=unique_user_ids, mask_token=None),
  # We add an additional embedding to account for unknown tokens.
  tf.keras.layers.Embedding(len(unique_user_ids) + 1, embedding_dimension)
])

course_model = tf.keras.Sequential([
  tf.keras.layers.StringLookup(
      vocabulary=unique_course_titles, mask_token=None),
  tf.keras.layers.Embedding(len(unique_course_titles) + 1, embedding_dimension)
])

class CourseModel(tfrs.Model):
 
  def __init__(self, user_model, course_model):
    super().__init__()
    self.course_model: tf.keras.Model = course_model
    self.user_model: tf.keras.Model = user_model
    self.task: tf.keras.layers.Layer = task

  def compute_loss(self, features: Dict[Text, tf.Tensor], training=False) -> tf.Tensor:
    user_embeddings = self.user_model(features["_id"])
    positive_course_embeddings = self.course_model(features["course_name"])
    return self.task(user_embeddings, positive_course_embeddings)

model = CourseModel(user_model, course_model)
model.compile(optimizer=tf.keras.optimizers.Adagrad(learning_rate=0.1))

cached_train = train.shuffle(100_000).batch(3).cache()
cached_test = test.batch(3).cache()

model.fit(cached_train, epochs=3)

model.evaluate(cached_test, return_dict=True)

index = tfrs.layers.factorized_top_k.BruteForce(model.user_model)
index.index_from_dataset(
 tf.data.Dataset.zip((courses.batch(3), courses.batch(3).map(model.course_model)))
)

_, titles = index(tf.constant(["2"]))
print(f"Recommendations for user 2: {titles[0, :3]}")

with tempfile.TemporaryDirectory() as tmp:
  path = os.path.join(tmp, "model")
  
  tf.saved_model.save(index, path)

  loaded = tf.saved_model.load(path)

  scores, titles = loaded(["42"])

  print(f"Recommendations: {titles[0][:3]}")