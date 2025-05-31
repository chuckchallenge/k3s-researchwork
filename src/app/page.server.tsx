import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';

export default async function DocsPage() {
  const filePath = path.join(process.cwd(), 'public',  'instruction.docx');
  const data = fs.readFileSync(filePath);
  const result = await mammoth.convertToHtml({ buffer: data });

  return {
    props: {
      content: result.value,
    },
  };
}