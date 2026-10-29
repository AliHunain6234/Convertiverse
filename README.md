# Convertiverse: PDF Tools Hub

A small website with three document tools that run **entirely in your browser**. Nothing is uploaded to a server, so your files stay on your computer. It is a class project for the Web Technology course (6th semester), built with plain HTML, CSS and JavaScript.

## The tools

| Tool | What it does | Page |
|---|---|---|
| **Image to PDF** | Select one or many images (JPG, PNG and more), see a preview, and download them as one PDF. Each image becomes one page, scaled to fit. | `Convertiverse.html` |
| **Text to PDF** | Type or paste text and download it as a PDF. Long text is wrapped and continues on new pages. | `pdfConverter.html` |
| **PDF to Word / Text / HTML** | Upload a PDF (click or drag and drop) and get its text as a `.docx`, `.txt` or `.html` file. A switch chooses between keeping the PDF's line breaks or joining each page into flowing paragraphs. | `converter.html` |

Other pages: `index.html` (home with the three tools), `Aboutus.html`, `ourServices.html` and `contactus.html`.

## How to run it

It needs no build step and no server code. Either open `index.html` in a browser, or serve the folder locally:

```bash
python -m http.server 8000
```

then open `http://localhost:8000`. An internet connection is needed because the libraries below load from a CDN.

## Libraries used (loaded from a CDN)

| Library | Used for |
|---|---|
| [jsPDF](https://github.com/parallax/jsPDF) 2.5.1 | Creating PDFs from images and text |
| [pdf.js](https://mozilla.github.io/pdf.js/) 2.16.105 | Reading the text inside a PDF |
| [docx](https://docx.js.org/) 7.1.0 | Creating Word files |
| [FileSaver.js](https://github.com/eligrey/FileSaver.js) 2.0.5 | Saving the result as a download |
| Font Awesome 6.5.0, Google Fonts | Icons and fonts |

## Project layout

```text
index.html            Home page with the three tool cards
Convertiverse.html    Image to PDF page      (Convertiverse.css, Convertiverse.js)
pdfConverter.html     Text to PDF page
converter.html        PDF to Word/Text/HTML page
Aboutus.html, ourServices.html, contactus.html
style.css             Styles of the home page
images/               Card pictures
```

## Limitations

- **PDF to Word converts only the text.** Pictures, tables and the original layout are not recreated, and a scanned PDF that contains only images has no text to extract (the page shows a clear message).
- The **contact form is a demo**: this project has no server, so it cannot send the message and says so.
- The text-to-PDF tool writes plain text in one font and does not support right-to-left languages such as Urdu.
- Very large PDFs or many large images can be slow, because all the work happens in the browser.
