import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';

export default async function DocsPage() {
  const filePath = path.join(process.cwd(), 'public', 'instruction.docx');
  console.log('Файл:', filePath);
  console.log('Существует?', fs.existsSync(filePath));

  if (!fs.existsSync(filePath)) {
    return <div>Файл не найден</div>;
  }

  const data = fs.readFileSync(filePath);
  const result = await mammoth.convertToHtml({ buffer: data });

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Документация</h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md ">
        <div dangerouslySetInnerHTML={{ __html: result.value }} />
      </div>
    </div>
  );
}