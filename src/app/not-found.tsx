import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="font-mono text-amber-600 text-sm font-bold uppercase tracking-wider mb-2">
        Error 404 · Safe Harbor Dispatch
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
        Requisition Not Found
      </h1>
      <p className="text-sm text-slate-600 max-w-md mb-6 leading-relaxed">
        The studio prop catalog page or serial specification you requested does not exist or has been archived from central vault dispatch.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
      >
        Return To Vault Overview
      </Link>
    </div>
  );
}
