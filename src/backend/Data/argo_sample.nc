# file: data_loader.py
import xarray as xr
import pandas as pd

# Load ARGO NetCDF file
ds = xr.open_dataset("argo_sample.nc")

# Print structure
print(ds)

# Convert to Pandas DataFrame
df = ds.to_dataframe().reset_index()

# Preview
print(df.head())

# Save to CSV (optional)
df.to_csv("argo_data.csv", index=False)
