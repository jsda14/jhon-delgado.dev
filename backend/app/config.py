import os
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env si está disponible
load_dotenv()

class Settings:
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    PORT: int = int(os.getenv("PORT", "8000"))
    HOST: str = os.getenv("HOST", "0.0.0.0")

    def validate(self):
        if not self.GEMINI_API_KEY:
            # No lanzar excepción inmediatamente para permitir iniciar el servidor
            # pero imprimir una advertencia clara en la consola del servidor
            print("⚠️ ADVERTENCIA: La variable GEMINI_API_KEY no está configurada. Las llamadas de chat fallarán.")

settings = Settings()
settings.validate()
