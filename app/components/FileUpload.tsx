'use client';
import { useCallback, useState } from 'react';
import { UploadedFile } from '@/app/types/form';

interface Props {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
}

const ACCEPTED_TYPES = {
  'application/pdf': ['.pdf'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function FileUpload({ files, onFilesChange }: Props) {
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const processFiles = useCallback((fileList: FileList | File[]) => {
    const newErrors: string[] = [];
    const newFiles: UploadedFile[] = [];
    const fileArray = Array.from(fileList);

    fileArray.forEach((file) => {
      if (!Object.keys(ACCEPTED_TYPES).includes(file.type)) {
        newErrors.push(`${file.name}: סוג קובץ לא נתמך`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        newErrors.push(`${file.name}: קובץ גדול מדי (מקסימום 10MB)`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        onFilesChange([...files, ...newFiles, {
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl,
        }]);
      };
      reader.readAsDataURL(file);
      newFiles.push({ name: file.name, size: file.size, type: file.type });
    });

    setErrors(newErrors);
  }, [files, onFilesChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('word')) return '📝';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    return '📎';
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
          dragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400 hover:bg-gray-50'
        }`}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <div className="text-4xl mb-2">📁</div>
        <p className="text-gray-600 font-medium">גרור קבצים לכאן או לחץ לבחירה</p>
        <p className="text-sm text-gray-400 mt-1">PDF, JPG, PNG, DOCX, XLSX — עד 10MB לקובץ</p>
        <input
          id="file-input"
          type="file"
          multiple
          accept={Object.values(ACCEPTED_TYPES).flat().join(',')}
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          {errors.map((err, i) => (
            <p key={i} className="text-sm text-red-600">⚠️ {err}</p>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">קבצים שנבחרו ({files.length})</p>
          {files.map((file, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-xl">{getFileIcon(file.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{formatSize(file.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-400 hover:text-red-600 transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
