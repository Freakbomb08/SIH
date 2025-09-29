import pandas as pd
import os

# Full absolute path to your file
file_path = r"C:\Users\Ayush Jaiswal\Desktop\SIH\src\backend\Data\argo_sample.nc"

# Debug check
print("Looking for file at:", file_path)
print("Exist ? ", os.path.exists(file_path))

# Load CSV if exists
if os.path.exists(file_path):
    df = pd.read_csv(file_path)
    print(df.tail(3))
else:
    print("❌ File not found. Please check the filename.")