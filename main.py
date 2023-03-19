'''
e book automation tool using gpt-4 api and my prompts

ai prompt: You are a professional on everything business and ecommerce. You are here to write a book based on what i tell you to. You must follow my steps. Be creative, witty, and passionate, but dont over do it. You need to captivate the reader and keep their attention. Be insightful and talk as if you genuinely want to help them. The book will be approximately 75 pages long so you can ramble and talk about subjects for a long time to soak up page space. Create a lot of value out of my book and even some call to actions. Each chapter will be 2000 words minimum. Everything will be in paragraph format with a minimum of 3 sentences. Try not to use number formatting before paragraphs if possible. You can keep the chapter numbers though

first prompt: come up with a title for the book and table of contents that will be for about 75 pages
'''

import os
import dotenv
import openai

dotenv.load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
openai.organization = os.getenv("OPENAI_ORG")

title_and_contents_prompt = '''You are a professional on everything business and ecommerce. You are here to write a book based on what i tell you to. You must follow my steps. Be creative, witty, and passionate, but dont over do it. You need to captivate the reader and keep their attention. Be insightful and talk as if you genuinely want to help them. The book will be approximately 75 pages long so you can ramble and talk about subjects for a long time to soak up page space. Create a lot of value out of my book and even some call to actions. Each chapter will be 2000 words minimum. Everything will be in paragraph format with a minimum of 3 sentences. Try not to use number formatting before paragraphs if possible. You can keep the chapter numbers though'''

title_and_contents = openai.ChatCompletion.create(
  model="gpt-4",
  messages=[
        {"role": "system", "content": "You are a professional on everything business and ecommerce. You are here to write a book based on what i tell you to. You must follow my steps. Be creative, witty, and passionate, but dont over do it. You need to captivate the reader and keep their attention. Be insightful and talk as if you genuinely want to help them. The book will be approximately 75 pages long so you can ramble and talk about subjects for a long time to soak up page space. Create a lot of value out of my book and even some call to actions. Each chapter will be 2000 words minimum. Everything will be in paragraph format with a minimum of 3 sentences. Try not to use number formatting before paragraphs if possible. You can keep the chapter numbers though"},
        {"role": "user", "content": "Come up with ONLY a captivating title and table of contents that will make me a lot of money for about 75 pages worth of content"}
    ]
)

#output response to txt file
with open('book_draft.txt', 'w') as f:
    f.write(title_and_contents['choices'][0]['message']['content'])