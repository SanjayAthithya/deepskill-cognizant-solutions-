from sqlalchemy import create_engine

USERNAME = "postgres"
PASSWORD = "pgs1234"
HOST = "localhost"
PORT = "5432"
DATABASE = "college_db_orm"

DATABASE_URL = f"postgresql+psycopg2://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}"

try:
    engine = create_engine(DATABASE_URL)
    with engine.connect() as connection:
        print("✅ Connected to PostgreSQL successfully!")
except Exception as e:
    print("❌ Connection failed!")
    print(e)