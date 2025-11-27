import { MenuItem } from '../menu.model';

// Agency/Freelancer Menu Configuration
export const agencyMenu: MenuItem[] = [
    // Dashboard
    {
        id: 1,
        label: 'Dashboard',
        icon: 'ki-filled ki-element-11',
        link: '/dashboard'
    },
    
    // Authentication & Account Section
    {
        id: 2,
        label: 'Account & Settings',
        isTitle: true,
    },
    {
        id: 3,
        label: 'Agency Profile',
        icon: 'ki-filled ki-profile-circle',
        link: '/agency/profile/setup'
    },
    {
        id: 4,
        label: 'Subscription',
        icon: 'ki-filled ki-bank',
        subItems: [
            {
                id: 5,
                label: 'Current Plan',
                link: '/agency/subscription/current',
                parentId: 4
            },
            {
                id: 6,
                label: 'Upgrade Plan',
                link: '/agency/subscription/upgrade',
                parentId: 4
            },
            {
                id: 7,
                label: 'Billing History',
                link: '/agency/subscription/billing-history',
                parentId: 4
            },
            {
                id: 8,
                label: 'Payment Methods',
                link: '/agency/subscription/payment-methods',
                parentId: 4
            }
        ]
    },

    // Core Management Section
    {
        id: 9,
        label: 'Core Management',
        isTitle: true,
    },
    // Client Management
    {
        id: 10,
        label: 'Client Management',
        icon: 'ki-filled ki-users',
        subItems: [
            {
                id: 11,
                label: 'Add New Client',
                link: '/agency/clients/add',
                parentId: 10
            },
            {
                id: 12,
                label: 'Client List',
                link: '/agency/clients/list',
                parentId: 10
            },
            {
                id: 13,
                label: 'Client Profiles',
                link: '/agency/clients/profiles',
                parentId: 10
            },
            {
                id: 14,
                label: 'Activity Timeline',
                link: '/agency/clients/activity-timeline',
                parentId: 10
            },
            {
                id: 15,
                label: 'Notes & Attachments',
                link: '/agency/clients/notes',
                parentId: 10
            },
            {
                id: 16,
                label: 'Contracts & Agreements',
                link: '/agency/clients/contracts',
                parentId: 10
            }
        ]
    },
    // Employee Management
    {
        id: 17,
        label: 'Employee Management',
        icon: 'ki-filled ki-users',
        subItems: [
            {
                id: 18,
                label: 'Employee Directory',
                link: '/agency/employees/directory',
                parentId: 17
            },
            {
                id: 19,
                label: 'Add Employee',
                link: '/agency/employees/add',
                parentId: 17
            },
            {
                id: 20,
                label: 'Departments',
                link: '/agency/employees/departments',
                parentId: 17
            },
            {
                id: 21,
                label: 'Roles & Permissions',
                link: '/agency/employees/roles-permissions',
                parentId: 17
            },
            {
                id: 22,
                label: 'Access Control',
                link: '/agency/employees/access-control',
                parentId: 17
            }
        ]
    },
    // Project & Development Management
    {
        id: 23,
        label: 'Projects & Development',
        icon: 'ki-filled ki-folder',
        subItems: [
            {
                id: 24,
                label: 'All Projects',
                link: '/agency/projects/list',
                parentId: 23
            },
            {
                id: 25,
                label: 'Create Project',
                link: '/agency/projects/create',
                parentId: 23
            },
            {
                id: 26,
                label: 'Task Manager',
                link: '/agency/projects/tasks',
                parentId: 23
            },
            {
                id: 27,
                label: 'Kanban Board',
                link: '/agency/projects/kanban',
                parentId: 23
            },
            {
                id: 28,
                label: 'Gantt Timeline',
                link: '/agency/projects/gantt',
                parentId: 23
            },
            {
                id: 29,
                label: 'Milestones',
                link: '/agency/projects/milestones',
                parentId: 23
            },
            {
                id: 30,
                label: 'File & Asset Sharing',
                link: '/agency/projects/files',
                parentId: 23
            }
        ]
    },
    // Accounting & Finance
    {
        id: 31,
        label: 'Accounting & Finance',
        icon: 'ki-filled ki-dollar',
        subItems: [
            {
                id: 32,
                label: 'Invoices',
                link: '/agency/accounting/invoices',
                parentId: 31
            },
            {
                id: 33,
                label: 'Estimates & Quotations',
                link: '/agency/accounting/estimates',
                parentId: 31
            },
            {
                id: 34,
                label: 'Expenses & Bills',
                link: '/agency/accounting/expenses',
                parentId: 31
            },
            {
                id: 35,
                label: 'Recurring Billing',
                link: '/agency/accounting/recurring-billing',
                parentId: 31
            },
            {
                id: 36,
                label: 'Payment Gateway',
                link: '/agency/accounting/payment-gateway',
                parentId: 31
            },
            {
                id: 37,
                label: 'Tax Settings',
                link: '/agency/accounting/tax-settings',
                parentId: 31
            }
        ]
    },
    // Inventory & Asset Management
    {
        id: 38,
        label: 'Inventory & Assets',
        icon: 'ki-filled ki-package',
        subItems: [
            {
                id: 39,
                label: 'Hardware Inventory',
                link: '/agency/inventory/hardware',
                parentId: 38
            },
            {
                id: 40,
                label: 'Software Licenses',
                link: '/agency/inventory/software',
                parentId: 38
            },
            {
                id: 41,
                label: 'Asset Assignment',
                link: '/agency/inventory/assignments',
                parentId: 38
            },
            {
                id: 42,
                label: 'Warranty & Expiry Alerts',
                link: '/agency/inventory/alerts',
                parentId: 38
            }
        ]
    },
    // Human Resource (HR) Tools
    {
        id: 43,
        label: 'Human Resources',
        icon: 'ki-filled ki-badge',
        subItems: [
            {
                id: 44,
                label: 'Leave Requests',
                link: '/agency/hr/leave-requests',
                parentId: 43
            },
            {
                id: 45,
                label: 'Employee Policies',
                link: '/agency/hr/policies',
                parentId: 43
            },
            {
                id: 46,
                label: 'Employee Documents',
                link: '/agency/hr/documents',
                parentId: 43
            },
            {
                id: 47,
                label: 'HR Announcements',
                link: '/agency/hr/announcements',
                parentId: 43
            }
        ]
    },
    // Payroll System
    {
        id: 48,
        label: 'Payroll System',
        icon: 'ki-filled ki-cheque',
        subItems: [
            {
                id: 49,
                label: 'Salary Structure',
                link: '/agency/payroll/salary-structure',
                parentId: 48
            },
            {
                id: 50,
                label: 'Salary Sheet',
                link: '/agency/payroll/salary-sheet',
                parentId: 48
            },
            {
                id: 51,
                label: 'Bonus & Deductions',
                link: '/agency/payroll/bonus-deductions',
                parentId: 48
            },
            {
                id: 52,
                label: 'Salary Slips',
                link: '/agency/payroll/salary-slips',
                parentId: 48
            }
        ]
    },
    // Attendance System
    {
        id: 53,
        label: 'Attendance System',
        icon: 'ki-filled ki-calendar',
        subItems: [
            {
                id: 54,
                label: 'Daily Attendance',
                link: '/agency/attendance/daily',
                parentId: 53
            },
            {
                id: 55,
                label: 'Remote Check-In/Out',
                link: '/agency/attendance/remote',
                parentId: 53
            },
            {
                id: 56,
                label: 'Attendance Reports',
                link: '/agency/attendance/reports',
                parentId: 53
            },
            {
                id: 57,
                label: 'Late & Early Insights',
                link: '/agency/attendance/insights',
                parentId: 53
            }
        ]
    },
    // IT Management
    {
        id: 58,
        label: 'IT Management',
        icon: 'ki-filled ki-technology-4',
        subItems: [
            {
                id: 59,
                label: 'IT Tickets',
                link: '/agency/it/tickets',
                parentId: 58
            },
            {
                id: 60,
                label: 'IT Asset Records',
                link: '/agency/it/assets',
                parentId: 58
            },
            {
                id: 61,
                label: 'Access Permissions',
                link: '/agency/it/access-permissions',
                parentId: 58
            }
        ]
    },

    // Digital Marketing Section
    {
        id: 62,
        label: 'Digital Marketing',
        isTitle: true,
    },
    // Social Media Management Suite
    {
        id: 63,
        label: 'Social Media Management',
        icon: 'ki-filled ki-social-media',
        subItems: [
            {
                id: 64,
                label: 'Platform Connections',
                parentId: 63,
                subItems: [
                    {
                        id: 65,
                        label: 'Instagram',
                        link: '/agency/social-media/connect/instagram',
                        parentId: 64
                    },
                    {
                        id: 66,
                        label: 'Facebook',
                        link: '/agency/social-media/connect/facebook',
                        parentId: 64
                    },
                    {
                        id: 67,
                        label: 'TikTok',
                        link: '/agency/social-media/connect/tiktok',
                        parentId: 64
                    },
                    {
                        id: 68,
                        label: 'YouTube',
                        link: '/agency/social-media/connect/youtube',
                        parentId: 64
                    },
                    {
                        id: 69,
                        label: 'LinkedIn',
                        link: '/agency/social-media/connect/linkedin',
                        parentId: 64
                    },
                    {
                        id: 70,
                        label: 'X (Twitter)',
                        link: '/agency/social-media/connect/twitter',
                        parentId: 64
                    }
                ]
            },
            {
                id: 71,
                label: 'Content Scheduler',
                link: '/agency/social-media/scheduler',
                parentId: 63
            },
            {
                id: 72,
                label: 'Multi-Calendar Planner',
                link: '/agency/social-media/calendar',
                parentId: 63
            },
            {
                id: 73,
                label: 'Insights Dashboard',
                link: '/agency/social-media/insights',
                parentId: 63
            },
            {
                id: 74,
                label: 'Platform Analytics',
                parentId: 63,
                subItems: [
                    {
                        id: 75,
                        label: 'Instagram Analytics',
                        link: '/agency/social-media/analytics/instagram',
                        parentId: 74
                    },
                    {
                        id: 76,
                        label: 'Facebook Analytics',
                        link: '/agency/social-media/analytics/facebook',
                        parentId: 74
                    },
                    {
                        id: 77,
                        label: 'TikTok Analytics',
                        link: '/agency/social-media/analytics/tiktok',
                        parentId: 74
                    },
                    {
                        id: 78,
                        label: 'YouTube Analytics',
                        link: '/agency/social-media/analytics/youtube',
                        parentId: 74
                    },
                    {
                        id: 79,
                        label: 'LinkedIn Analytics',
                        link: '/agency/social-media/analytics/linkedin',
                        parentId: 74
                    },
                    {
                        id: 80,
                        label: 'X Analytics',
                        link: '/agency/social-media/analytics/twitter',
                        parentId: 74
                    }
                ]
            },
            {
                id: 81,
                label: 'Bulk Upload Posts',
                link: '/agency/social-media/bulk-upload',
                parentId: 63
            },
            {
                id: 82,
                label: 'Auto Publishing',
                link: '/agency/social-media/auto-publish',
                parentId: 63
            },
            {
                id: 83,
                label: 'Hashtag Suggestions',
                link: '/agency/social-media/hashtags',
                parentId: 63
            }
        ]
    },
    // Influencer Directory (Credits-Based)
    {
        id: 84,
        label: 'Influencer Directory',
        icon: 'ki-filled ki-star',
        subItems: [
            {
                id: 85,
                label: 'Search Influencers',
                link: '/agency/influencers/search',
                parentId: 84
            },
            {
                id: 86,
                label: 'Influencer Profiles',
                link: '/agency/influencers/profiles',
                parentId: 84
            },
            {
                id: 87,
                label: 'Saved Influencers',
                link: '/agency/influencers/saved',
                parentId: 84
            },
            {
                id: 88,
                label: 'Filter by Niche',
                link: '/agency/influencers/filter-niche',
                parentId: 84
            },
            {
                id: 89,
                label: 'Filter by Location',
                link: '/agency/influencers/filter-location',
                parentId: 84
            }
        ]
    },
    // Influencer Collaboration History
    {
        id: 90,
        label: 'Influencer Collaborations',
        icon: 'ki-filled ki-people',
        subItems: [
            {
                id: 91,
                label: 'Past Projects',
                link: '/agency/collaborations/past-projects',
                parentId: 90
            },
            {
                id: 92,
                label: 'Performance Data',
                link: '/agency/collaborations/performance',
                parentId: 90
            },
            {
                id: 93,
                label: 'Communication Logs',
                link: '/agency/collaborations/communications',
                parentId: 90
            },
            {
                id: 94,
                label: 'Deliverables History',
                link: '/agency/collaborations/deliverables',
                parentId: 90
            }
        ]
    },
    // Email Marketing Tools
    {
        id: 95,
        label: 'Email Marketing',
        icon: 'ki-filled ki-sms',
        subItems: [
            {
                id: 96,
                label: 'Campaign Builder',
                link: '/agency/email-marketing/campaign-builder',
                parentId: 95
            },
            {
                id: 97,
                label: 'Email Templates',
                link: '/agency/email-marketing/templates',
                parentId: 95
            },
            {
                id: 98,
                label: 'Contact Lists',
                link: '/agency/email-marketing/contact-lists',
                parentId: 95
            },
            {
                id: 99,
                label: 'Campaign Reports',
                link: '/agency/email-marketing/reports',
                parentId: 95
            }
        ]
    },
    // SEO Tools
    {
        id: 100,
        label: 'SEO Tools',
        icon: 'ki-filled ki-chart-line-up',
        subItems: [
            {
                id: 101,
                label: 'SEO Checker',
                link: '/agency/seo/checker',
                parentId: 100
            },
            {
                id: 102,
                label: 'Keyword Ideas',
                link: '/agency/seo/keywords',
                parentId: 100
            },
            {
                id: 103,
                label: 'Website Audit',
                link: '/agency/seo/audit',
                parentId: 100
            }
        ]
    },

    // Marketing & Sales Section
    {
        id: 104,
        label: 'Marketing & Sales',
        isTitle: true,
    },
    // Marketing & Sales CRM
    {
        id: 105,
        label: 'Sales CRM',
        icon: 'ki-filled ki-abstract-26',
        subItems: [
            {
                id: 106,
                label: 'Lead Capture',
                link: '/agency/crm/lead-capture',
                parentId: 105
            },
            {
                id: 107,
                label: 'Lead Lists',
                link: '/agency/crm/lead-lists',
                parentId: 105
            },
            {
                id: 108,
                label: 'Sales Pipeline',
                link: '/agency/crm/sales-pipeline',
                parentId: 105
            },
            {
                id: 109,
                label: 'Follow-up Reminders',
                link: '/agency/crm/follow-up',
                parentId: 105
            },
            {
                id: 110,
                label: 'Client Onboarding',
                link: '/agency/crm/onboarding',
                parentId: 105
            }
        ]
    },
    // Helpdesk
    {
        id: 111,
        label: 'Helpdesk',
        icon: 'ki-filled ki-messages',
        subItems: [
            {
                id: 112,
                label: 'Support Tickets',
                link: '/agency/helpdesk/tickets',
                parentId: 111
            },
            {
                id: 113,
                label: 'Department Assignments',
                link: '/agency/helpdesk/departments',
                parentId: 111
            },
            {
                id: 114,
                label: 'Ticket Chat',
                link: '/agency/helpdesk/chat',
                parentId: 111
            },
            {
                id: 115,
                label: 'Ticket Status',
                link: '/agency/helpdesk/status',
                parentId: 111
            }
        ]
    },
    // Expert Sessions
    {
        id: 116,
        label: 'Expert Sessions',
        icon: 'ki-filled ki-teacher',
        subItems: [
            {
                id: 117,
                label: 'Live Workshops',
                link: '/agency/expert-sessions/live-workshops',
                parentId: 116
            },
            {
                id: 118,
                label: 'Recorded Sessions',
                link: '/agency/expert-sessions/recorded',
                parentId: 116
            },
            {
                id: 119,
                label: 'Register for Sessions',
                link: '/agency/expert-sessions/register',
                parentId: 116
            },
            {
                id: 120,
                label: 'My Sessions',
                link: '/agency/expert-sessions/my-sessions',
                parentId: 116
            }
        ]
    },

    // Cloud & Integrations Section
    {
        id: 121,
        label: 'Cloud & Integrations',
        isTitle: true,
    },
    // Cloud Integrations
    {
        id: 122,
        label: 'Cloud Storage',
        icon: 'ki-filled ki-cloud',
        subItems: [
            {
                id: 123,
                label: 'Google Drive',
                link: '/agency/cloud/google-drive',
                parentId: 122
            },
            {
                id: 124,
                label: 'Dropbox',
                link: '/agency/cloud/dropbox',
                parentId: 122
            },
            {
                id: 125,
                label: 'OneDrive',
                link: '/agency/cloud/onedrive',
                parentId: 122
            },
            {
                id: 126,
                label: 'iCloud',
                link: '/agency/cloud/icloud',
                parentId: 122
            },
            {
                id: 127,
                label: 'Internal File Manager',
                link: '/agency/cloud/file-manager',
                parentId: 122
            }
        ]
    },
    // Token/Queue System
    {
        id: 128,
        label: 'Token & Queue System',
        icon: 'ki-filled ki-delivery-time',
        subItems: [
            {
                id: 129,
                label: 'Generate Token',
                link: '/agency/queue/generate',
                parentId: 128
            },
            {
                id: 130,
                label: 'Waiting Queue',
                link: '/agency/queue/waiting',
                parentId: 128
            },
            {
                id: 131,
                label: 'Call Next Token',
                link: '/agency/queue/call-next',
                parentId: 128
            },
            {
                id: 132,
                label: 'Multi Counter',
                link: '/agency/queue/multi-counter',
                parentId: 128
            }
        ]
    },

    // Credits & Billing Section
    {
        id: 133,
        label: 'Credits & Billing',
        isTitle: true,
    },
    // Credit System
    {
        id: 134,
        label: 'Credit System',
        icon: 'ki-filled ki-wallet',
        subItems: [
            {
                id: 135,
                label: 'Credit Balance',
                link: '/agency/credits/balance',
                parentId: 134
            },
            {
                id: 136,
                label: 'Buy Credits',
                link: '/agency/credits/buy',
                parentId: 134
            },
            {
                id: 137,
                label: 'Credit Usage History',
                link: '/agency/credits/usage-history',
                parentId: 134
            },
            {
                id: 138,
                label: 'Auto Credit Refill',
                link: '/agency/credits/auto-refill',
                parentId: 134
            }
        ]
    },
    // Reports & Analytics Section
    {
        id: 139,
        label: 'Reports & Analytics',
        isTitle: true,
    },
    {
        id: 140,
        label: 'Reports & Analytics',
        icon: 'ki-filled ki-chart-line-up',
        subItems: [
            {
                id: 141,
                label: 'Project Reports',
                link: '/agency/reports/projects',
                parentId: 140
            },
            {
                id: 142,
                label: 'Client Reports',
                link: '/agency/reports/clients',
                parentId: 140
            },
            {
                id: 143,
                label: 'Employee Performance',
                link: '/agency/reports/employee-performance',
                parentId: 140
            },
            {
                id: 144,
                label: 'Revenue Reports',
                link: '/agency/reports/revenue',
                parentId: 140
            },
            {
                id: 145,
                label: 'Social Media Reports',
                link: '/agency/reports/social-media',
                parentId: 140
            },
            {
                id: 146,
                label: 'Credit Usage Reports',
                link: '/agency/reports/credit-usage',
                parentId: 140
            },
            {
                id: 147,
                label: 'Campaign Performance',
                link: '/agency/reports/campaign-performance',
                parentId: 140
            }
        ]
    }
];
