// import { AlertCircle, CheckCircle, InfoIcon, AlertTriangle, X } from 'lucide-react';

// type AlertType = 'success' | 'error' | 'info' | 'warning';

// interface AlertProps {
//   type: AlertType;
//   title: string;
//   message?: string;
//   onClose?: () => void;
//   dismissible?: boolean;
// }

// const alertStyles = {
//   success: {
//     bg: 'bg-green-50',
//     border: 'border-green-200',
//     icon: 'text-green-600',
//     title: 'text-green-900',
//     message: 'text-green-700',
//     button: 'hover:bg-green-100',
//     Icon: CheckCircle,
//   },
//   error: {
//     bg: 'bg-red-50',
//     border: 'border-red-200',
//     icon: 'text-red-600',
//     title: 'text-red-900',
//     message: 'text-red-700',
//     button: 'hover:bg-red-100',
//     Icon: AlertCircle,
//   },
//   info: {
//     bg: 'bg-blue-50',
//     border: 'border-blue-200',
//     icon: 'text-blue-600',
//     title: 'text-blue-900',
//     message: 'text-blue-700',
//     button: 'hover:bg-blue-100',
//     Icon: InfoIcon,
//   },
//   warning: {
//     bg: 'bg-yellow-50',
//     border: 'border-yellow-200',
//     icon: 'text-yellow-600',
//     title: 'text-yellow-900',
//     message: 'text-yellow-700',
//     button: 'hover:bg-yellow-100',
//     Icon: AlertTriangle,
//   },
// };

// export function Alert({
//   type,
//   title,
//   message,
//   onClose,
//   dismissible = true,
// }: AlertProps) {
//   const style = alertStyles[type];
//   const Icon = style.Icon;

//   return (
//     <div className={`${style.bg} border-2 ${style.border} rounded-xl p-4 flex items-start gap-3`}>
//       <Icon className={`${style.icon} w-5 h-5 flex-shrink-0 mt-0.5`} />
//       <div className="flex-1">
//         <h3 className={`font-semibold ${style.title}`}>{title}</h3>
//         {message && <p className={`text-sm mt-1 ${style.message}`}>{message}</p>}
//       </div>
//       {dismissible && onClose && (
//         <button
//           onClick={onClose}
//           className={`${style.button} p-1 rounded-lg transition-colors flex-shrink-0`}
//         >
//           <X className="w-4 h-4" />
//         </button>
//       )}
//     </div>
//   );
// }
