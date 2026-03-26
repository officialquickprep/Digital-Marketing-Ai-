import sys
import subprocess

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package, "--quiet"])

try:
    import pypdf
except ImportError:
    install('pypdf')
    import pypdf

try:
    reader = pypdf.PdfReader('d:\\Digiatalai\\AI_Marketing_Agent_Full_PRD_v3.pdf')
    with open('d:\\Digiatalai\\prd_text.txt', 'w', encoding='utf-8') as f:
        for i, page in enumerate(reader.pages):
            f.write(f"--- Page {i+1} ---\n")
            extracted = page.extract_text()
            if extracted:
                f.write(extracted + "\n")
    print("Extraction complete. Output saved to prd_text.txt")
except Exception as e:
    print(f"Error: {e}")
