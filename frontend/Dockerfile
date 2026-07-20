FROM python:3.9-slim
WORKDIR /app
COPY requirments.txt .
RUN pip install -r requirments.txt
COPY . .
EXPOSE 80
CMD ["PYTHON", "app.py"]