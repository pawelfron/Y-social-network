# Y-social-network
Twitter/X Clone

## Launching the application
1. Unzip the archive containing the project files.
2. Locate the `.env` file inside the `backend` directory. You will need to add a secret key there.
3. You can generate it by running the following command:
    ```bash
    python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
    ```
4. Then, add the generated secret key to the `.env` file as follows:
    ```env
    DJANGO_SECRET_KEY=your_secret_key_here
    ```
5. Now, navigate to the root directory of the project and run:
    ```bash
    docker-compose up --build
    ```
    This should build and start the entire service.

