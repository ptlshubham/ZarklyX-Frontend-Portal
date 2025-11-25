import { MenuItem } from '../menu.model';

// Agency Client Menu Configuration
export const agencyClientMenu: MenuItem[] = [
    // Dashboard
    {
        id: 1,
        label: 'Dashboard',
        icon: 'ki-filled ki-element-11',
        link: '/client/dashboard'
    },

    // My Account Section
    {
        id: 2,
        label: 'My Account',
        isTitle: true,
    },
    {
        id: 3,
        label: 'Profile',
        icon: 'ki-filled ki-profile-circle',
        link: '/client/profile'
    },
    {
        id: 4,
        label: 'Subscription & Billing',
        icon: 'ki-filled ki-bank',
        subItems: [
            {
                id: 5,
                label: 'Current Plan',
                link: '/client/subscription/current',
                parentId: 4
            },
            {
                id: 6,
                label: 'Invoices',
                link: '/client/subscription/invoices',
                parentId: 4
            },
            {
                id: 7,
                label: 'Payment History',
                link: '/client/subscription/payment-history',
                parentId: 4
            },
            {
                id: 8,
                label: 'Payment Methods',
                link: '/client/subscription/payment-methods',
                parentId: 4
            }
        ]
    },

    // Projects & Tasks Section
    {
        id: 9,
        label: 'Projects & Tasks',
        isTitle: true,
    },
    {
        id: 10,
        label: 'My Projects',
        icon: 'ki-filled ki-folder',
        subItems: [
            {
                id: 11,
                label: 'All Projects',
                link: '/client/projects/list',
                parentId: 10
            },
            {
                id: 12,
                label: 'Active Projects',
                link: '/client/projects/active',
                parentId: 10
            },
            {
                id: 13,
                label: 'Completed Projects',
                link: '/client/projects/completed',
                parentId: 10
            },
            {
                id: 14,
                label: 'Project Timeline',
                link: '/client/projects/timeline',
                parentId: 10
            }
        ]
    },
    {
        id: 15,
        label: 'Tasks',
        icon: 'ki-filled ki-note-2',
        subItems: [
            {
                id: 16,
                label: 'My Tasks',
                link: '/client/tasks/my-tasks',
                parentId: 15
            },
            {
                id: 17,
                label: 'Task Calendar',
                link: '/client/tasks/calendar',
                parentId: 15
            },
            {
                id: 18,
                label: 'Task Reports',
                link: '/client/tasks/reports',
                parentId: 15
            }
        ]
    },

    // Communication Section
    {
        id: 19,
        label: 'Communication',
        isTitle: true,
    },
    {
        id: 20,
        label: 'Messages',
        icon: 'ki-filled ki-messages',
        link: '/client/messages',
        badge: {
            text: 'New',
            class: 'badge-primary'
        }
    },
    {
        id: 21,
        label: 'Meetings',
        icon: 'ki-filled ki-calendar',
        subItems: [
            {
                id: 22,
                label: 'Schedule Meeting',
                link: '/client/meetings/schedule',
                parentId: 21
            },
            {
                id: 23,
                label: 'Upcoming Meetings',
                link: '/client/meetings/upcoming',
                parentId: 21
            },
            {
                id: 24,
                label: 'Past Meetings',
                link: '/client/meetings/past',
                parentId: 21
            }
        ]
    },

    // Files & Documents Section
    {
        id: 25,
        label: 'Files & Documents',
        isTitle: true,
    },
    {
        id: 26,
        label: 'My Files',
        icon: 'ki-filled ki-file',
        subItems: [
            {
                id: 27,
                label: 'All Files',
                link: '/client/files/all',
                parentId: 26
            },
            {
                id: 28,
                label: 'Shared With Me',
                link: '/client/files/shared',
                parentId: 26
            },
            {
                id: 29,
                label: 'Documents',
                link: '/client/files/documents',
                parentId: 26
            },
            {
                id: 30,
                label: 'Media',
                link: '/client/files/media',
                parentId: 26
            }
        ]
    },
    {
        id: 31,
        label: 'Contracts & Agreements',
        icon: 'ki-filled ki-document',
        link: '/client/contracts'
    },

    // Support Section
    {
        id: 32,
        label: 'Support',
        isTitle: true,
    },
    {
        id: 33,
        label: 'Help & Support',
        icon: 'ki-filled ki-question-2',
        subItems: [
            {
                id: 34,
                label: 'Create Ticket',
                link: '/client/support/create-ticket',
                parentId: 33
            },
            {
                id: 35,
                label: 'My Tickets',
                link: '/client/support/tickets',
                parentId: 33
            },
            {
                id: 36,
                label: 'Knowledge Base',
                link: '/client/support/knowledge-base',
                parentId: 33
            },
            {
                id: 37,
                label: 'FAQs',
                link: '/client/support/faqs',
                parentId: 33
            }
        ]
    },

    // Reports Section
    {
        id: 38,
        label: 'Reports',
        isTitle: true,
    },
    {
        id: 39,
        label: 'Analytics & Reports',
        icon: 'ki-filled ki-chart-line-up',
        subItems: [
            {
                id: 40,
                label: 'Project Reports',
                link: '/client/reports/projects',
                parentId: 39
            },
            {
                id: 41,
                label: 'Performance Reports',
                link: '/client/reports/performance',
                parentId: 39
            },
            {
                id: 42,
                label: 'Activity Logs',
                link: '/client/reports/activity',
                parentId: 39
            }
        ]
    }
];
