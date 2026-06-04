from PyPDF2 import PdfReader
import sys

PDF_PATH = r"c:\Users\prist\OneDrive\Desktop\portfolio website\Portfolio-Website\PrettyM_CV_2026.pdf"

reader = PdfReader(PDF_PATH)
texts = []
for page in reader.pages:
    t = page.extract_text()
    if t:
        texts.append(t)

print("\n\n".join(texts))
