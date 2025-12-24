// "use client";
// import { useEffect, useState } from 'react';
// import { Clock, Trash2 } from 'lucide-react';
// // import { supabase } from '../lib/supabase';
// import { Alert } from '../alert/page';
// import HeaderText from '@/components/ui/headerText';

// interface HistoryItem {
//   id: string;
//   city_name: string;
//   country: string;
//   created_at: string;
// }

// interface HistoryProps {
//   onSelect: (cityName: string) => void;
// }

// export function History({ onSelect }: HistoryProps) {
//   const [history, setHistory] = useState<HistoryItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     setLoading(true);
//     // try {
//     //   const { data, error } = await supabase
//     //     .from('search_history')
//     //     .select('id, city_name, country, created_at')
//     //     .order('created_at', { ascending: false })
//     //     .limit(10);

//     //   if (error) throw error;
//     //   setHistory(data || []);
//     // } catch (error) {
//     //   setAlert({ type: 'error', message: 'Failed to load search history' });
//     // } finally {
//     //   setLoading(false);
//     // }
//   };

//   const handleDelete = async (id: string) => {
//     // try {
//     //   const { error } = await supabase.from('search_history').delete().eq('id', id);

//     //   if (error) throw error;

//     //   setHistory(history.filter((item) => item.id !== id));
//     //   setAlert({ type: 'success', message: 'Search removed from history' });
//     // } catch (error) {
//     //   setAlert({ type: 'error', message: 'Failed to delete history item' });
//     // }
//   };

//   const handleSelect = (cityName: string) => {
//     onSelect(cityName);
//     setAlert({ type: 'success', message: `Searching for ${cityName}...` });
//   };

//   const handleClearAll = async () => {
//     try {
//       // const { error } = await supabase.from('search_history').delete().neq('id', '');

//       // if (error) throw error;

//       setHistory([]);
//       setAlert({ type: 'success', message: 'Search history cleared' });
//     } catch (error) {
//       setAlert({ type: 'error', message: 'Failed to clear history' });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
//         <div className="flex items-center gap-2 mb-4">
//           <Clock className="w-5 h-5 text-gray-400" />
//           <h2 className="text-lg font-bold text-gray-900">Recent Searches</h2>
//         </div>
//         <p className="text-gray-600 text-center py-4">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <Clock className="w-5 h-5 text-gray-400" />
//           <h2 className="text-lg font-bold text-gray-900">Recent Searches</h2>
//         </div>
//         {history.length > 0 && (
//           <button
//             onClick={handleClearAll}
//             className="text-sm text-gray-600 hover:text-red-600 transition-colors"
//           >
//             Clear all
//           </button>
//         )}
//       </div>

//       {alert && (
//         <div className="mb-4">
//           <Alert
//             type={alert.type}
//             title={alert.type === 'success' ? 'Success' : 'Error'}
//             message={alert.message}
//             onClose={() => setAlert(null)}
//             dismissible
//           />
//         </div>
//       )}

//       {history.length === 0 ? (
//         <p className="text-gray-600 text-center py-8">No search history yet</p>
//       ) : (
//         <div className="space-y-2">
//           {history.map((item) => {
//             const date = new Date(item.created_at).toLocaleDateString('en-US', {
//               month: 'short',
//               day: 'numeric',
//               hour: '2-digit',
//               minute: '2-digit',
//             });

//             return (
//               <div
//                 key={item.id}
//                 className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg transition-colors group"
//               >
//                 <HeaderText paragraphText='Track Weather History'/>
//                 <button
//                   onClick={() => handleSelect(item.city_name)}
//                   className="flex-1 text-left"
//                 >
//                   <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
//                     {item.city_name}
//                   </p>
//                   <p className="text-xs text-gray-500">{item.country} • {date}</p>
//                 </button>
//                 <button
//                   onClick={() => handleDelete(item.id)}
//                   className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
