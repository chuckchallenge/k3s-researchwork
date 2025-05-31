'use client';

import { useEffect, useState } from 'react';

export default function Docs({ content }: { content: string }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Документация</h1>
      {loading ? (
        <p className="text-center text-lg">Загрузка документации...</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
    </div>
  );
}