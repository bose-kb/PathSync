// import { useState, useEffect } from "react";
// import {
//   Calendar,
//   CheckCircle2,
//   Clock,
//   Hourglass,
//   Award,
//   BookOpen,
//   ChevronRight,
//   BarChart3,
//   CircleCheck
// } from "lucide-react";
// import { Link } from "react-router";

// // Define TypeScript interfaces
// interface ProgressEntry {
//   topicName: string;
//   subTopicName: string;
//   estimatedCompletionDate: string;
//   completionStatus: boolean;
//   duration: string;
// }

// interface DashboardMetrics {
//   completionPercentage: number;
//   completedSubTopics: number;
//   totalSubTopics: number;
//   estimatedCompletionDate: string;
// }

// // Card component for reuse
// const Card = ({ children, className = "" }) => {
//   return (
//     <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
//       {children}
//     </div>
//   );
// };

// // Stat display component
// const StatDisplay = ({ label, value, icon }) => {
//   return (
//     <div className="flex items-center p-4 bg-gray-50 rounded-lg">
//       <div className="p-3 mr-4 bg-blue-100 rounded-full">
//         {icon}
//       </div>
//       <div>
//         <p className="text-sm font-medium text-gray-600">{label}</p>
//         <p className="text-lg font-semibold text-gray-900">{value}</p>
//       </div>
//     </div>
//   );
// };

// // Task item component
// const TaskItem = ({ task, onMarkComplete }) => {
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric"
//     });
//   };

//   return (
//     <div className="p-4 border-b border-gray-100 flex items-center justify-between">
//       <div className="flex-1">
//         <h4 className="font-medium text-gray-900">{task.subTopicName}</h4>
//         <p className="text-sm text-gray-600">{task.topicName}</p>
//         <div className="mt-1 flex items-center gap-4">
//           <span className="flex items-center text-xs text-gray-500">
//             <Clock size={14} className="mr-1" />
//             {task.duration}
//           </span>
//           <span className="flex items-center text-xs text-gray-500">
//             <Calendar size={14} className="mr-1" />
//             Due {formatDate(task.estimatedCompletionDate)}
//           </span>
//         </div>
//       </div>
//       {!task.completionStatus && (
//         <button
//           onClick={() => onMarkComplete(task.topicName, task.subTopicName)}
//           className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm flex items-center cursor-pointer"
//         >
//           <CheckCircle2 size={14} className="mr-1 cursor-pointer" />
//           Mark Complete
//         </button>
//       )}
//       {task.completionStatus && (
//         <span className="px-3 py-1 bg-green-50 text-green-600 rounded-md text-sm flex items-center">
//           <CheckCircle2 size={14} className="mr-1" />
//           Completed
//         </span>
//       )}
//     </div>
//   );
// };

// // Progress bar component
// const ProgressBar = ({ percentage }) => {
//   return (
//     <div className="w-full bg-gray-200 rounded-full h-2.5">
//       <div
//         className="bg-blue-600 h-2.5 rounded-full"
//         style={{ width: `${percentage}%` }}
//       ></div>
//     </div>
//   );
// };

// export default function Dashboard() {
//   // State declarations
//   const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetrics | null>(null);
//   const [upcomingTasks, setUpcomingTasks] = useState<ProgressEntry[]>([]);
//   const [completedTasks, setCompletedTasks] = useState<ProgressEntry[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState("upcoming");

//   const token=localStorage.getItem("accessToken");
//   console.log(token);
//   const headers = {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         };

//   // Fetch all required data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // Fetch dashboard metrics
//         const metricsResponse = await fetch("http://localhost:8080/user-progress/dashboard",{headers});
//         const metricsData = await metricsResponse.json();

//         // Fetch upcoming tasks
//         const upcomingResponse = await fetch("http://localhost:8080/user-progress/dashboard/upcoming-due-dates",{headers});
//         const upcomingData = await upcomingResponse.json();

//         // Fetch completed tasks
//         const completedResponse = await fetch("http://localhost:8080/user-progress/completed-tasks",{headers});
//         const completedData = await completedResponse.json();
//         console.log(completedData)

//         // Update state with fetched data
//         setDashboardMetrics(metricsData);
//         setUpcomingTasks(upcomingData);
//         setCompletedTasks(completedData);

//       } catch (err) {
//         setError("Failed to load dashboard data. Please try again later.");
//         console.error("Error fetching dashboard data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to mark a subtopic as completed
//   const handleMarkComplete = async (topicName, subTopicName) => {
//     const token=localStorage.getItem("accessToken");
//   console.log(token);
//   const headers = {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         };
//     try {
//       const response = await fetch("http://localhost:8080/user-progress/mark-completed", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: `topicName=${encodeURIComponent(topicName)}&subTopicName=${encodeURIComponent(subTopicName)}`,
//       });

//       if (response.ok) {
//         // Update local state to reflect the change
//         const updatedUpcomingTasks = upcomingTasks.filter(
//           task => !(task.topicName === topicName && task.subTopicName === subTopicName)
//         );

//         const completedTask = upcomingTasks.find(
//           task => task.topicName === topicName && task.subTopicName === subTopicName
//         );

//         if (completedTask) {
//           const updatedTask = { ...completedTask, completionStatus: true };
//           setCompletedTasks([...completedTasks, updatedTask]);
//         }

//         setUpcomingTasks(updatedUpcomingTasks);

//         // Refresh dashboard metrics
//         const metricsResponse = await fetch("http://localhost:8080/user-progress/dashboard",{headers});
//         const metricsData = await metricsResponse.json();
//         setDashboardMetrics(metricsData);
//       }
//     } catch (err) {
//       setError("Failed to mark task as complete. Please try again.");
//       console.error("Error marking task as complete:", err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-center">
//           <Hourglass className="w-12 h-12 mx-auto text-blue-500 animate-pulse" />
//           <p className="mt-4 text-gray-600">Loading your dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-center max-w-md p-6 bg-red-50 rounded-lg">
//           <p className="text-red-600">{error}</p>
//           <button
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//             onClick={() => window.location.reload()}
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric"
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Profile header */}
//         <div className="flex flex-col md:flex-row justify-between items-start mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Learning Dashboard</h1>
//             <p className="text-gray-600">Track your learning progress and upcoming tasks</p>
//           </div>
//           <Link to="/roadmap"><div className="mt-4 md:mt-0">
//             <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//               Developer Learning Path
//             </span>
//           </div></Link>
//         </div>

//         {/* Overview cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <Card className="col-span-full md:col-span-2">
//             <div className="flex flex-col md:flex-row justify-between">
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900 mb-2">Overall Progress</h2>
//                 <div className="flex items-end gap-2 mb-4">
//                   <span className="text-3xl font-bold text-blue-600">{dashboardMetrics?.completionPercentage}%</span>
//                   <span className="text-gray-500 text-sm mb-1">Completed</span>
//                 </div>
//                 <div className="mb-6">
//                   <ProgressBar percentage={dashboardMetrics?.completionPercentage || 0} />
//                 </div>
//                 <div className="flex gap-4 flex-wrap">
//                   <div className="flex items-center">
//                     <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
//                     <span className="text-sm text-gray-600">{dashboardMetrics?.completedSubTopics} of {dashboardMetrics?.totalSubTopics} subtopics completed</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Calendar size={16} className="text-gray-500 mr-2" />
//                     <span className="text-sm text-gray-600">Est. completion: {formatDate(dashboardMetrics?.estimatedCompletionDate)}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-6 md:mt-0">
//                 <div className="w-32 h-32 md:w-40 md:h-40 relative">
//                   <svg viewBox="0 0 36 36" className="w-full h-full">
//                     <path
//                       d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                       fill="none"
//                       stroke="#E5E7EB"
//                       strokeWidth="3"
//                     />
//                     <path
//                       d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                       fill="none"
//                       stroke="#3B82F6"
//                       strokeWidth="3"
//                       strokeDasharray={`${dashboardMetrics?.completionPercentage}, 100`}
//                       strokeLinecap="round"
//                     />
//                     <text x="18" y="20" textAnchor="middle" fill="#3B82F6" fontSize="8" fontWeight="bold">
//                       {dashboardMetrics?.completionPercentage}%
//                     </text>
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </Card>
//           <div className="space-y-6">
//             <StatDisplay
//               label="Total Sub-topics"
//               value={dashboardMetrics?.totalSubTopics}
//               icon={<BookOpen size={20} className="text-blue-600" />}
//             />
//             <StatDisplay
//               label="Completed Sub-topics"
//               value={dashboardMetrics?.completedSubTopics}
//               icon={<CheckCircle2 size={20} className="text-green-600" />}
//             />
//             <StatDisplay
//               label="Estimated Completion"
//               value={formatDate(dashboardMetrics?.estimatedCompletionDate)}
//               icon={<Calendar size={20} className="text-purple-600" />}
//             />
//           </div>
//         </div>

//         {/* Task lists */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <Card className="lg:col-span-2">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
//               <div className="flex border border-gray-200 rounded-lg overflow-hidden">
//                 <button
//                   className={`px-4 py-2 text-sm cursor-pointer ${activeTab === 'upcoming' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
//                   onClick={() => setActiveTab('upcoming')}
//                 >
//                   Upcoming
//                 </button>
//                 <button
//                   className={`px-4 py-2 text-sm cursor-pointer ${activeTab === 'completed' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
//                   onClick={() => setActiveTab('completed')}
//                 >
//                   Completed
//                 </button>
//               </div>
//             </div>

//             <div className="overflow-hidden border border-gray-200 rounded-lg">
//               {activeTab === 'upcoming' && (
//                 <>
//                   {upcomingTasks.length > 0 ? (
//                     <div>
//                       {upcomingTasks.map((task, index) => (
//                         <TaskItem
//                           key={`${task.topicName}-${task.subTopicName}`}
//                           task={task}
//                           onMarkComplete={handleMarkComplete}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="p-8 text-center">
//                       <CircleCheck size={40} className="mx-auto text-gray-400 mb-2" />
//                       <p className="text-gray-600">All caught up! No upcoming tasks.</p>
//                     </div>
//                   )}
//                 </>
//               )}

//               {activeTab === 'completed' && (
//                 <>
//                   {completedTasks.length > 0 ? (
//                     <div>
//                       {completedTasks.map((task, index) => (
//                         <TaskItem
//                           key={`${task.topicName}-${task.subTopicName}`}
//                           task={task}
//                           onMarkComplete={handleMarkComplete}
//                         />
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="p-8 text-center">
//                       <Hourglass size={40} className="mx-auto text-gray-400 mb-2" />
//                       <p className="text-gray-600">No completed tasks yet.</p>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           </Card>

//           <div className="space-y-6">
//             <Card>
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Streak</h2>
//               <div className="flex items-center justify-between">
//                 <div className="text-center">
//                   <p className="text-3xl font-bold text-blue-600">3</p>
//                   <p className="text-sm text-gray-600">Days</p>
//                 </div>
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
//                   <Award size={28} className="text-blue-600" />
//                 </div>
//               </div>
//               <div className="mt-4 pt-4 border-t border-gray-100">
//                 <div className="flex justify-between">
//                   {[1, 2, 3, 4, 5, 6, 7].map((day) => (
//                     <div
//                       key={day}
//                       className={`w-8 h-8 rounded-full flex items-center justify-center
//                       ${day <= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
//                     >
//                       {day}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </Card>

//             <Card>
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Skill Progress</h2>
//               <div className="space-y-4">
//                 <div>
//                   <div className="flex justify-between mb-1">
//                     <span className="text-sm font-medium text-gray-700">Concurrency</span>
//                     <span className="text-sm font-medium text-gray-700">50%</span>
//                   </div>
//                   <ProgressBar percentage={50} />
//                 </div>
//                 <div>
//                   <div className="flex justify-between mb-1">
//                     <span className="text-sm font-medium text-gray-700">Database Management</span>
//                     <span className="text-sm font-medium text-gray-700">0%</span>
//                   </div>
//                   <ProgressBar percentage={0} />
//                 </div>
//               </div>
//               <button className="w-full mt-4 text-sm text-blue-600 flex items-center justify-center">
//                 View all skills
//                 <ChevronRight size={16} />
//               </button>
//             </Card>

//             <Card>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-semibold text-gray-900">Weekly Activity</h2>
//                 <BarChart3 size={20} className="text-gray-500" />
//               </div>
//               <div className="flex justify-between items-end h-32">
//                 {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
//                   <div key={day} className="flex flex-col items-center">
//                     <div
//                       className={`w-8 ${index === 2 ? 'h-24 bg-blue-600' :
//                         index === 1 ? 'h-16 bg-blue-400' :
//                         index === 0 ? 'h-10 bg-blue-300' :
//                         'h-4 bg-gray-200'} rounded-t-md`}
//                     ></div>
//                     <span className="text-xs text-gray-500 mt-1">{day}</span>
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link } from "react-router";
import {
  Calendar,
  CheckCircle2,
  Hourglass,
  Award,
  BookOpen,
  ChevronRight,
  BarChart3,
  CircleCheck,
} from "lucide-react";

// Import components
import Card from "./Card";
import StatDisplay from "./StatDisplay";
import TaskItem from "./TaskItem";
import ProgressBar from "./ProgressBar";

// Import custom hook for data fetching
import useDashboardData from "./useDashboardData";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const {
    dashboardMetrics,
    upcomingTasks,
    completedTasks,
    loading,
    error,
    handleMarkComplete,
    MajorSkills,
  } = useDashboardData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Hourglass className="w-12 h-12 mx-auto text-blue-500 animate-pulse" />
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center max-w-md p-6 bg-red-50 rounded-lg">
          <p className="text-red-600">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Learning Dashboard
            </h1>
            <p className="text-gray-600">
              Track your learning progress and upcoming tasks
            </p>
          </div>
          <Link to="/roadmap">
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Developer Learning Path
              </span>
            </div>
          </Link>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-full md:col-span-2 ">
            <div className="flex flex-col md:flex-row justify-between ">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Overall Progress
                </h2>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-3xl font-bold text-blue-600">
                    {dashboardMetrics?.completionPercentage}%
                  </span>
                  <span className="text-gray-500 text-sm mb-1">Completed</span>
                </div>
                <div className="mb-6">
                  <ProgressBar
                    percentage={dashboardMetrics?.completionPercentage || 0}
                  />
                </div>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">
                      {dashboardMetrics?.completedSubTopics} of{" "}
                      {dashboardMetrics?.totalSubTopics} subtopics completed
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      Est. completion:{" "}
                      {formatDate(
                        dashboardMetrics?.estimatedCompletionDate || ""
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-0">
                <div className="w-32 h-32 md:w-40 md:h-40 relative">
                  <svg viewBox="0 0 36 36" className="w-full h-full">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="3"
                      strokeDasharray={`${dashboardMetrics?.completionPercentage}, 100`}
                      strokeLinecap="round"
                    />
                    <text
                      x="18"
                      y="20"
                      textAnchor="middle"
                      fill="#3B82F6"
                      fontSize="8"
                      fontWeight="bold"
                    >
                      {dashboardMetrics?.completionPercentage}%
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </Card>
          <div className="space-y-6">
            <StatDisplay
              label="Total Sub-topics"
              value={dashboardMetrics?.totalSubTopics || 0}
              icon={<BookOpen size={20} className="text-blue-600" />}
            />
            <StatDisplay
              label="Completed Sub-topics"
              value={dashboardMetrics?.completedSubTopics || 0}
              icon={<CheckCircle2 size={20} className="text-green-600" />}
            />
            <StatDisplay
              label="Estimated Completion"
              value={formatDate(
                dashboardMetrics?.estimatedCompletionDate || ""
              )}
              icon={<Calendar size={20} className="text-purple-600" />}
            />
          </div>
        </div>

        {/* Task lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className={`px-4 py-2 text-sm cursor-pointer ${
                    activeTab === "upcoming"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-white text-gray-600"
                  }`}
                  onClick={() => setActiveTab("upcoming")}
                >
                  Upcoming
                </button>
                <button
                  className={`px-4 py-2 text-sm cursor-pointer ${
                    activeTab === "completed"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-white text-gray-600"
                  }`}
                  onClick={() => setActiveTab("completed")}
                >
                  Completed
                </button>
              </div>
            </div>

            <div className="overflow-hidden border border-gray-200 rounded-lg">
              {activeTab === "upcoming" && (
                <>
                  {upcomingTasks.length > 0 ? (
                    <div>
                      {upcomingTasks.map((task) => (
                        <TaskItem
                          key={`${task.topicName}-${task.subTopicName}`}
                          task={task}
                          onMarkComplete={handleMarkComplete}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <CircleCheck
                        size={40}
                        className="mx-auto text-gray-400 mb-2"
                      />
                      <p className="text-gray-600">
                        All caught up! No upcoming tasks.
                      </p>
                    </div>
                  )}
                </>
              )}

              {activeTab === "completed" && (
                <>
                  {completedTasks.length > 0 ? (
                    <div>
                      {completedTasks.map((task) => (
                        <TaskItem
                          key={`${task.topicName}-${task.subTopicName}`}
                          task={task}
                          onMarkComplete={handleMarkComplete}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Hourglass
                        size={40}
                        className="mx-auto text-gray-400 mb-2"
                      />
                      <p className="text-gray-600">No completed tasks yet.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </Card>

          <div className="space-y-6">
            {/* <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Learning Streak
              </h2>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">3</p>
                  <p className="text-sm text-gray-600">Days</p>
                </div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Award size={28} className="text-blue-600" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div
                      key={day}
                      className={`w-8 h-8 rounded-full flex items-center justify-center 
                      ${
                        day <= 3
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </Card> */}

            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Skill Progress
              </h2>
              <div className="space-y-2">
                {MajorSkills.map((skill, index) => (
                  <div
                    key={index} // unique key for each skill item
                    className="inline-block bg-blue-100 text-blue-700 border border-blue-700 px-2 py-1 text-sm rounded-md m-1"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Weekly Activity
                </h2>
                <BarChart3 size={20} className="text-gray-500" />
              </div>
              <div className="flex justify-between items-end h-32">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, index) => (
                    <div key={day} className="flex flex-col items-center">
                      <div
                        className={`w-8 ${
                          index === 2
                            ? "h-24 bg-blue-600"
                            : index === 1
                            ? "h-16 bg-blue-400"
                            : index === 0
                            ? "h-10 bg-blue-300"
                            : "h-4 bg-gray-200"
                        } rounded-t-md`}
                      ></div>
                      <span className="text-xs text-gray-500 mt-1">{day}</span>
                    </div>
                  )
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
