FROM python:3.13-slim
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY --exclude=requirements.txt . .
EXPOSE 8000
CMD ["gunicorn", "-w 2", "-b 0.0.0.0:8000", "app:app"]