import { MenuItem } from '../menu.model';

// Agency Employee Menu Configuration
export const agencyEmployeeMenu: MenuItem[] = [
    // Dashboard
    {
        id: 1,
        label: 'Dashboard',
        icon: 'ki-filled ki-element-11',
        link: '/employee/dashboard'
    },

    // My Work Section
    {
        id: 2,
        label: 'My Work',
        isTitle: true,
    },
    {
        id: 3,
        label: 'My Tasks',
        icon: 'ki-filled ki-note-2',
        subItems: [
            {
                id: 4,
                label: 'Assigned Tasks',
                link: '/employee/tasks/assigned',
                parentId: 3
            },
            {
                id: 5,
                label: 'In Progress',
                link: '/employee/tasks/in-progress',
                parentId: 3
            },
            {
                id: 6,
                label: 'Completed',
                link: '/employee/tasks/completed',
                parentId: 3
            },
            {
                id: 7,
                label: 'Task Calendar',
                link: '/employee/tasks/calendar',
                parentId: 3
            }
        ]
    },
    {
        id: 8,
        label: 'My Projects',
        icon: 'ki-filled ki-folder',
        subItems: [
            {
                id: 9,
                label: 'Active Projects',
                link: '/employee/projects/active',
                parentId: 8
            },
            {
                id: 10,
                label: 'Project Timeline',
                link: '/employee/projects/timeline',
                parentId: 8
            },
            {
                id: 11,
                label: 'Project Files',
                link: '/employee/projects/files',
                parentId: 8
            }
        ]
    },
    {
        id: 12,
        label: 'Timesheet',
        icon: 'ki-filled ki-timer',
        subItems: [
            {
                id: 13,
                label: 'Log Time',
                link: '/employee/timesheet/log',
                parentId: 12
            },
            {
                id: 14,
                label: 'My Timesheet',
                link: '/employee/timesheet/my-timesheet',
                parentId: 12
            },
            {
                id: 15,
                label: 'Time Reports',
                link: '/employee/timesheet/reports',
                parentId: 12
            }
        ]
    },

    // Clients Section
    {
        id: 16,
        label: 'Clients',
        isTitle: true,
    },
    {
        id: 17,
        label: 'Client Management',
        icon: 'ki-filled ki-profile-user',
        subItems: [
            {
                id: 18,
                label: 'My Clients',
                link: '/employee/clients/my-clients',
                parentId: 17
            },
            {
                id: 19,
                label: 'Client Communications',
                link: '/employee/clients/communications',
                parentId: 17
            }
        ]
    },

    // Team Collaboration Section
    {
        id: 20,
        label: 'Team Collaboration',
        isTitle: true,
    },
    {
        id: 21,
        label: 'Team Chat',
        icon: 'ki-filled ki-messages',
        link: '/employee/team/chat',
        badge: {
            text: 'New',
            class: 'badge-primary'
        }
    },
    {
        id: 22,
        label: 'Meetings',
        icon: 'ki-filled ki-calendar',
        subItems: [
            {
                id: 23,
                label: 'Schedule Meeting',
                link: '/employee/meetings/schedule',
                parentId: 22
            },
            {
                id: 24,
                label: 'Upcoming Meetings',
                link: '/employee/meetings/upcoming',
                parentId: 22
            },
            {
                id: 25,
                label: 'Meeting History',
                link: '/employee/meetings/history',
                parentId: 22
            }
        ]
    },
    {
        id: 26,
        label: 'Shared Files',
        icon: 'ki-filled ki-file',
        link: '/employee/team/shared-files'
    },

    // HR & Attendance Section
    {
        id: 27,
        label: 'HR & Attendance',
        isTitle: true,
    },
    {
        id: 28,
        label: 'Attendance',
        icon: 'ki-filled ki-calendar',
        subItems: [
            {
                id: 29,
                label: 'Check-In/Out',
                link: '/employee/attendance/check-in',
                parentId: 28
            },
            {
                id: 30,
                label: 'My Attendance',
                link: '/employee/attendance/my-attendance',
                parentId: 28
            },
            {
                id: 31,
                label: 'Attendance Report',
                link: '/employee/attendance/report',
                parentId: 28
            }
        ]
    },
    {
        id: 32,
        label: 'Leave Management',
        icon: 'ki-filled ki-exit-right',
        subItems: [
            {
                id: 33,
                label: 'Apply Leave',
                link: '/employee/leave/apply',
                parentId: 32
            },
            {
                id: 34,
                label: 'Leave Balance',
                link: '/employee/leave/balance',
                parentId: 32
            },
            {
                id: 35,
                label: 'Leave History',
                link: '/employee/leave/history',
                parentId: 32
            }
        ]
    },
    {
        id: 36,
        label: 'Payroll',
        icon: 'ki-filled ki-cheque',
        subItems: [
            {
                id: 37,
                label: 'Salary Slips',
                link: '/employee/payroll/salary-slips',
                parentId: 36
            },
            {
                id: 38,
                label: 'Tax Documents',
                link: '/employee/payroll/tax-documents',
                parentId: 36
            }
        ]
    },

    // Social Media Section (if assigned)
    {
        id: 39,
        label: 'Social Media',
        isTitle: true,
    },
    {
        id: 40,
        label: 'Content Management',
        icon: 'ki-filled ki-social-media',
        subItems: [
            {
                id: 41,
                label: 'Create Post',
                link: '/employee/social-media/create-post',
                parentId: 40
            },
            {
                id: 42,
                label: 'Schedule Posts',
                link: '/employee/social-media/schedule',
                parentId: 40
            },
            {
                id: 43,
                label: 'Content Calendar',
                link: '/employee/social-media/calendar',
                parentId: 40
            },
            {
                id: 44,
                label: 'My Posts',
                link: '/employee/social-media/my-posts',
                parentId: 40
            }
        ]
    },
    {
        id: 45,
        label: 'Analytics',
        icon: 'ki-filled ki-chart-line-up',
        subItems: [
            {
                id: 46,
                label: 'Performance Reports',
                link: '/employee/social-media/analytics/performance',
                parentId: 45
            },
            {
                id: 47,
                label: 'Engagement Stats',
                link: '/employee/social-media/analytics/engagement',
                parentId: 45
            }
        ]
    },

    // My Profile Section
    {
        id: 48,
        label: 'My Profile',
        isTitle: true,
    },
    {
        id: 49,
        label: 'Profile Settings',
        icon: 'ki-filled ki-profile-circle',
        link: '/employee/profile/settings'
    },
    {
        id: 50,
        label: 'Documents',
        icon: 'ki-filled ki-document',
        subItems: [
            {
                id: 51,
                label: 'My Documents',
                link: '/employee/documents/my-documents',
                parentId: 50
            },
            {
                id: 52,
                label: 'Company Policies',
                link: '/employee/documents/policies',
                parentId: 50
            }
        ]
    },
    {
        id: 53,
        label: 'Performance',
        icon: 'ki-filled ki-award',
        subItems: [
            {
                id: 54,
                label: 'My Performance',
                link: '/employee/performance/my-performance',
                parentId: 53
            },
            {
                id: 55,
                label: 'Goals & Objectives',
                link: '/employee/performance/goals',
                parentId: 53
            },
            {
                id: 56,
                label: 'Feedback',
                link: '/employee/performance/feedback',
                parentId: 53
            }
        ]
    },

    // Support Section
    {
        id: 57,
        label: 'Support',
        isTitle: true,
    },
    {
        id: 58,
        label: 'Help & Support',
        icon: 'ki-filled ki-question-2',
        subItems: [
            {
                id: 59,
                label: 'IT Tickets',
                link: '/employee/support/it-tickets',
                parentId: 58
            },
            {
                id: 60,
                label: 'HR Queries',
                link: '/employee/support/hr-queries',
                parentId: 58
            },
            {
                id: 61,
                label: 'Knowledge Base',
                link: '/employee/support/knowledge-base',
                parentId: 58
            }
        ]
    }
];
