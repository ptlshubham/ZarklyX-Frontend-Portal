import { MenuItem } from './menu.model';

// Super Admin Menu Configuration
export const superAdminMenu: MenuItem[] = [
    // Dashboard
    {
        id: 1,
        label: 'Dashboard',
        icon: 'ki-filled ki-element-11',
        link: '/super-admin/dashboard'
    },
    // Management Section
    {
        id: 2,
        label: 'Management',
        isTitle: true,
    },
    // Subscription & Billing
    {
        id: 3,
        label: 'Subscription & Billing',
        icon: 'ki-filled ki-bank',
        subItems: [
            {
                id: 4,
                label: 'Plans',
                parentId: 3,
                subItems: [
                    {
                        id: 5,
                        label: 'Manage Plans',
                        link: '/super-admin/subscription/plans/manage',
                        parentId: 4
                    },
                    {
                        id: 6,
                        label: 'Create Plans',
                        link: '/super-admin/subscription/plans/create',
                        parentId: 4
                    },
                    {
                        id: 7,
                        label: 'Plan Features',
                        link: '/super-admin/subscription/plans/features',
                        parentId: 4
                    }
                ]
            },
            {
                id: 8,
                label: 'Free Trial',
                link: '/super-admin/subscription/free-trial',
                parentId: 3
            },
            {
                id: 9,
                label: 'Coupons',
                link: '/super-admin/subscription/coupons',
                parentId: 3
            },
            {
                id: 10,
                label: 'Renewal & Billing Logs',
                link: '/super-admin/subscription/renewal-logs',
                parentId: 3
            },
            {
                id: 11,
                label: 'Billing Logs',
                link: '/super-admin/subscription/billing-logs',
                parentId: 3
            }
        ]
    },
    // Agency Management
    {
        id: 12,
        label: 'Agency Management',
        icon: 'ki-filled ki-social-media',
        subItems: [
            {
                id: 13,
                label: 'Agencies',
                link: '/super-admin/agencies/list',
                parentId: 12
            },
            {
                id: 14,
                label: 'Approvals',
                parentId: 12,
                subItems: [
                    {
                        id: 15,
                        label: 'Pending',
                        link: '/super-admin/agencies/approvals/pending',
                        parentId: 14
                    },
                    {
                        id: 16,
                        label: 'Approved',
                        link: '/super-admin/agencies/approvals/approved',
                        parentId: 14
                    },
                    {
                        id: 17,
                        label: 'Rejected',
                        link: '/super-admin/agencies/approvals/rejected',
                        parentId: 14
                    }
                ]
            },
            {
                id: 18,
                label: 'KYC / Documents',
                link: '/super-admin/agencies/kyc',
                parentId: 12
            },
            {
                id: 19,
                label: 'Business Category Manager',
                link: '/super-admin/agencies/categories',
                parentId: 12
            },
            {
                id: 20,
                label: 'Premium Feature Control',
                link: '/super-admin/agencies/premium-features',
                parentId: 12
            },
            {
                id: 21,
                label: 'Usage Insights',
                parentId: 12,
                subItems: [
                    {
                        id: 22,
                        label: 'Credits Usage',
                        link: '/super-admin/agencies/usage/credits',
                        parentId: 21
                    },
                    {
                        id: 23,
                        label: 'Storage Usage',
                        link: '/super-admin/agencies/usage/storage',
                        parentId: 21
                    },
                    {
                        id: 24,
                        label: 'Social Accounts',
                        link: '/super-admin/agencies/usage/social-accounts',
                        parentId: 21
                    }
                ]
            }
        ]
    },
    // Influencer Management
    {
        id: 25,
        label: 'Influencer Management',
        icon: 'ki-filled ki-users',
        subItems: [
            {
                id: 26,
                label: 'All Influencers',
                link: '/super-admin/influencers/list',
                parentId: 25
            },
            {
                id: 27,
                label: 'Approvals',
                link: '/super-admin/influencers/approvals',
                parentId: 25
            },
            {
                id: 28,
                label: 'Categories',
                parentId: 25,
                subItems: [
                    {
                        id: 29,
                        label: 'Category',
                        link: '/super-admin/influencers/categories',
                        parentId: 28
                    },
                    {
                        id: 30,
                        label: 'Sub-category',
                        link: '/super-admin/influencers/sub-categories',
                        parentId: 28
                    }
                ]
            },
            {
                id: 31,
                label: 'Platforms',
                parentId: 25,
                subItems: [
                    {
                        id: 32,
                        label: 'Instagram',
                        link: '/super-admin/influencers/platforms/instagram',
                        parentId: 31
                    },
                    {
                        id: 33,
                        label: 'Facebook',
                        link: '/super-admin/influencers/platforms/facebook',
                        parentId: 31
                    },
                    {
                        id: 34,
                        label: 'TikTok',
                        link: '/super-admin/influencers/platforms/tiktok',
                        parentId: 31
                    },
                    {
                        id: 35,
                        label: 'YouTube',
                        link: '/super-admin/influencers/platforms/youtube',
                        parentId: 31
                    }
                ]
            },
            {
                id: 36,
                label: 'Influencer Health & Stats',
                link: '/super-admin/influencers/health-stats',
                parentId: 25
            },
            {
                id: 37,
                label: 'Influencer KYC',
                link: '/super-admin/influencers/kyc',
                parentId: 25
            }
        ]
    },
    // Credits Management
    {
        id: 38,
        label: 'Credits Management',
        icon: 'ki-filled ki-dollar',
        subItems: [
            {
                id: 39,
                label: 'Credit Packages',
                link: '/super-admin/credits/packages',
                parentId: 38
            },
            {
                id: 40,
                label: 'Credit Pricing',
                link: '/super-admin/credits/pricing',
                parentId: 38
            },
            {
                id: 41,
                label: 'Manual Credit Adjustment',
                link: '/super-admin/credits/manual-adjustment',
                parentId: 38
            },
            {
                id: 42,
                label: 'Credit Purchase History',
                link: '/super-admin/credits/purchase-history',
                parentId: 38
            },
            {
                id: 43,
                label: 'Credit Usage Reports',
                link: '/super-admin/credits/usage-reports',
                parentId: 38
            }
        ]
    },
    // Platform Integrations
    {
        id: 44,
        label: 'Platform Integrations',
        icon: 'ki-filled ki-technology-2',
        subItems: [
            {
                id: 45,
                label: 'Social APIs',
                parentId: 44,
                subItems: [
                    {
                        id: 46,
                        label: 'Instagram API',
                        link: '/super-admin/integrations/social/instagram',
                        parentId: 45
                    },
                    {
                        id: 47,
                        label: 'Facebook API',
                        link: '/super-admin/integrations/social/facebook',
                        parentId: 45
                    },
                    {
                        id: 48,
                        label: 'TikTok API',
                        link: '/super-admin/integrations/social/tiktok',
                        parentId: 45
                    },
                    {
                        id: 49,
                        label: 'YouTube API',
                        link: '/super-admin/integrations/social/youtube',
                        parentId: 45
                    }
                ]
            },
            {
                id: 50,
                label: 'Cloud Integrations',
                parentId: 44,
                subItems: [
                    {
                        id: 51,
                        label: 'AWS',
                        link: '/super-admin/integrations/cloud/aws',
                        parentId: 50
                    },
                    {
                        id: 52,
                        label: 'GCP',
                        link: '/super-admin/integrations/cloud/gcp',
                        parentId: 50
                    },
                    {
                        id: 53,
                        label: 'Azure',
                        link: '/super-admin/integrations/cloud/azure',
                        parentId: 50
                    }
                ]
            },
            {
                id: 54,
                label: 'SMTP & SMS',
                parentId: 44,
                subItems: [
                    {
                        id: 55,
                        label: 'SMTP Configuration',
                        link: '/super-admin/integrations/smtp',
                        parentId: 54
                    },
                    {
                        id: 56,
                        label: 'SMS Gateway',
                        link: '/super-admin/integrations/sms',
                        parentId: 54
                    }
                ]
            }
        ]
    },
    // System Content
    {
        id: 57,
        label: 'System Content',
        icon: 'ki-filled ki-social-media',
        subItems: [
            {
                id: 58,
                label: 'Blog Management',
                link: '/super-admin/content/blogs',
                parentId: 57
            },
            {
                id: 59,
                label: 'CMS',
                parentId: 57,
                subItems: [
                    {
                        id: 60,
                        label: 'Privacy Policy',
                        link: '/super-admin/content/cms/privacy',
                        parentId: 59
                    },
                    {
                        id: 61,
                        label: 'Terms & Conditions',
                        link: '/super-admin/content/cms/terms',
                        parentId: 59
                    },
                    {
                        id: 62,
                        label: 'Refund Policy',
                        link: '/super-admin/content/cms/refund',
                        parentId: 59
                    }
                ]
            },
            {
                id: 63,
                label: 'FAQs',
                link: '/super-admin/content/faqs',
                parentId: 57
            },
            {
                id: 64,
                label: 'Email Templates',
                link: '/super-admin/content/email-templates',
                parentId: 57
            },
            {
                id: 65,
                label: 'SMS Templates',
                link: '/super-admin/content/sms-templates',
                parentId: 57
            },
            {
                id: 66,
                label: 'Push Notification Templates',
                link: '/super-admin/content/push-templates',
                parentId: 57
            }
        ]
    },
    // Support & Tickets
    {
        id: 67,
        label: 'Support & Tickets',
        icon: 'ki-filled ki-messages',
        subItems: [
            {
                id: 68,
                label: 'All Tickets',
                link: '/super-admin/tickets/all',
                parentId: 67
            },
            {
                id: 69,
                label: 'Assign Tickets',
                link: '/super-admin/tickets/assign',
                parentId: 67
            },
            {
                id: 70,
                label: 'Departments',
                parentId: 67,
                subItems: [
                    {
                        id: 71,
                        label: 'Teams',
                        link: '/super-admin/tickets/departments/teams',
                        parentId: 70
                    },
                    {
                        id: 72,
                        label: 'SLA',
                        link: '/super-admin/tickets/departments/sla',
                        parentId: 70
                    },
                    {
                        id: 73,
                        label: 'Escalation',
                        link: '/super-admin/tickets/departments/escalation',
                        parentId: 70
                    }
                ]
            },
            {
                id: 74,
                label: 'Ticket SLAs',
                link: '/super-admin/tickets/slas',
                parentId: 67
            },
            {
                id: 75,
                label: 'Agent Performance',
                link: '/super-admin/tickets/agent-performance',
                parentId: 67
            }
        ]
    },
    // Technical Access
    {
        id: 76,
        label: 'Technical Access',
        icon: 'ki-filled ki-shield',
        subItems: [
            {
                id: 77,
                label: 'Support PIN System',
                link: '/super-admin/security/pin',
                parentId: 76
            },
            {
                id: 78,
                label: 'Temporary Client Access',
                link: '/super-admin/security/temp-access',
                parentId: 76
            }
        ]
    },
    // Reviews & Feedback
    {
        id: 79,
        label: 'Reviews & Feedback',
        icon: 'ki-filled ki-star',
        subItems: [
            {
                id: 80,
                label: 'Agency Reviews',
                link: '/super-admin/reviews/agencies',
                parentId: 79
            },
            {
                id: 81,
                label: 'Influencer Reviews',
                link: '/super-admin/reviews/influencers',
                parentId: 79
            },
            {
                id: 82,
                label: 'System Feedback',
                link: '/super-admin/reviews/system-feedback',
                parentId: 79
            }
        ]
    },
    // Transactions & Payments
    {
        id: 83,
        label: 'Transactions & Payments',
        icon: 'ki-filled ki-cheque',
        subItems: [
            {
                id: 84,
                label: 'Subscription Payments',
                link: '/super-admin/payments/subscriptions',
                parentId: 83
            },
            {
                id: 85,
                label: 'Credit Purchases',
                link: '/super-admin/payments/credits',
                parentId: 83
            },
            {
                id: 86,
                label: 'Payouts',
                parentId: 83,
                subItems: [
                    {
                        id: 87,
                        label: 'Influencer Payouts',
                        link: '/super-admin/payments/payouts/influencers',
                        parentId: 86
                    },
                    {
                        id: 88,
                        label: 'Agency Payouts',
                        link: '/super-admin/payments/payouts/agencies',
                        parentId: 86
                    }
                ]
            },
            {
                id: 89,
                label: 'Refund Requests',
                link: '/super-admin/payments/refunds',
                parentId: 83
            },
            {
                id: 90,
                label: 'Transaction Logs',
                link: '/super-admin/payments/transactions-log',
                parentId: 83
            }
        ]
    },
    // Reports & Analytics Section
    {
        id: 91,
        label: 'Reports & Analytics',
        isTitle: true,
    },
    {
        id: 92,
        label: 'Reports',
        icon: 'ki-filled ki-chart-line-up',
        subItems: [
            {
                id: 93,
                label: 'Agency Reports',
                link: '/super-admin/reports/agencies',
                parentId: 92
            },
            {
                id: 94,
                label: 'Influencer Reports',
                link: '/super-admin/reports/influencers',
                parentId: 92
            },
            {
                id: 95,
                label: 'Subscription Reports',
                link: '/super-admin/reports/subscriptions',
                parentId: 92
            },
            {
                id: 96,
                label: 'Revenue Reports',
                link: '/super-admin/reports/revenue',
                parentId: 92
            },
            {
                id: 97,
                label: 'Platform Usage',
                parentId: 92,
                subItems: [
                    {
                        id: 98,
                        label: 'Daily Active Users',
                        link: '/super-admin/reports/usage/daily-active',
                        parentId: 97
                    },
                    {
                        id: 99,
                        label: 'Monthly Active Users',
                        link: '/super-admin/reports/usage/monthly-active',
                        parentId: 97
                    },
                    {
                        id: 100,
                        label: 'Feature Usage',
                        link: '/super-admin/reports/usage/features',
                        parentId: 97
                    }
                ]
            },
            {
                id: 101,
                label: 'Credit Reports',
                link: '/super-admin/reports/credits',
                parentId: 92
            },
            {
                id: 102,
                label: 'Cloud Storage Reports',
                link: '/super-admin/reports/storage',
                parentId: 92
            },
            {
                id: 103,
                label: 'Monthly Growth Reports',
                link: '/super-admin/reports/growth',
                parentId: 92
            },
            {
                id: 104,
                label: 'Conversion Funnel Reports',
                link: '/super-admin/reports/funnel',
                parentId: 92
            }
        ]
    },
    // Logs & Monitoring Section
    {
        id: 105,
        label: 'Logs & Monitoring',
        isTitle: true,
    },
    {
        id: 106,
        label: 'Logs & Monitoring',
        icon: 'ki-filled ki-note-2',
        subItems: [
            {
                id: 107,
                label: 'Activity Logs',
                link: '/super-admin/logs/activity',
                parentId: 106
            },
            {
                id: 108,
                label: 'Login Logs',
                link: '/super-admin/logs/login',
                parentId: 106
            },
            {
                id: 109,
                label: 'Email/SMS Logs',
                link: '/super-admin/logs/email-sms',
                parentId: 106
            },
            {
                id: 110,
                label: 'API Logs',
                link: '/super-admin/logs/api',
                parentId: 106
            },
            {
                id: 111,
                label: 'Error Tracking',
                link: '/super-admin/logs/errors',
                parentId: 106
            }
        ]
    },
    // Automation Engine Section
    {
        id: 112,
        label: 'Automation Engine',
        isTitle: true,
    },
    {
        id: 113,
        label: 'Automation Engine',
        icon: 'ki-filled ki-rocket',
        subItems: [
            {
                id: 114,
                label: 'Auto Subscription Emails',
                link: '/super-admin/automation/subscription-emails',
                parentId: 113
            },
            {
                id: 115,
                label: 'Auto Lead Assignment',
                link: '/super-admin/automation/lead-assignment',
                parentId: 113
            },
            {
                id: 116,
                label: 'Auto Ticket Assignment',
                link: '/super-admin/automation/ticket-assignment',
                parentId: 113
            },
            {
                id: 117,
                label: 'Auto Reminder System',
                link: '/super-admin/automation/reminders',
                parentId: 113
            }
        ]
    },
    // White Labeling Section
    {
        id: 118,
        label: 'White Labeling',
        isTitle: true,
    },
    {
        id: 119,
        label: 'White Labeling',
        icon: 'ki-filled ki-brush',
        subItems: [
            {
                id: 120,
                label: 'Custom Domain',
                link: '/super-admin/branding/domain',
                parentId: 119
            },
            {
                id: 121,
                label: 'Custom Logo',
                link: '/super-admin/branding/logo',
                parentId: 119
            },
            {
                id: 122,
                label: 'Theme Colors',
                link: '/super-admin/branding/theme',
                parentId: 119
            },
            {
                id: 123,
                label: 'Custom Email Sender',
                link: '/super-admin/branding/email-sender',
                parentId: 119
            }
        ]
    },
    // Quick Access Section
    {
        id: 124,
        label: 'Quick Access',
        isTitle: true,
    },
    {
        id: 125,
        label: 'Switch to Dashboard',
        icon: 'ki-filled ki-switch',
        link: '/dashboard'
    }
];
