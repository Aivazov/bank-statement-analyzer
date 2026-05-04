import React, { ChangeEvent } from 'react';

type FileUploaderProps = {
  uploadFile: (e: ChangeEvent<HTMLInputElement, Element>) => Promise<void>;
};

const FileUploader = ({ uploadFile }: FileUploaderProps) => {
  return (
    <section className='relative border-2 border-gray-300 p-10 rounded-3xl border-dashed hover:bg-zinc-700'>
      <input
        type='file'
        accept='.csv'
        onChange={uploadFile}
        className='absolute w-full h-full inset-0 opacity-0 cursor-pointer'
      />
      <p>Перетягніть CSV файл сюди або натисніть</p>
    </section>
  );
};

export default FileUploader;
