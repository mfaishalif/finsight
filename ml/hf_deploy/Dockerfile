# Read the specific docs: https://huggingface.co/docs/hub/spaces-sdks-docker-first-demo

FROM python:3.10

WORKDIR /code

# Copy requirements first to leverage Docker cache
COPY ./requirements.txt /code/requirements.txt

# Install dependencies
# Using --no-cache-dir to keep image small
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the rest of the application
COPY . /code

# Create a non-root user (Hugging Face requirement for security)
RUN useradd -m -u 1000 user

# Grant ownership of the working directory to the user
RUN chown -R user:user /code

USER user
ENV HOME=/home/user \
	PATH=/home/user/.local/bin:$PATH

# Expose the port that Hugging Face Spaces expects
EXPOSE 7860

# Start the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
