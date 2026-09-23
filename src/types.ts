export interface Subscription {
    id: string;
    name: string;
    price: number;
    category: string;
    renewalDate: string;
    billingCycle: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';
    lastPaidDate?: string;
    hasEverBeenPaid?: boolean;
    isTrial?: boolean;
    trialEndDate?: string;
    regularPrice?: number;
    isOneTimePayment?: boolean;

    isSplit?: boolean;
    splitWith?: number;
    isVariable?: boolean;
    isEssential?: boolean;
    paymentHistory?: PaymentRecord[];
}

export interface PaymentRecord {
    date: string;
    amount: number;
}

export interface Profile {
    id: string;
    name: string;
    city: string;
    timezone: string;
    currency: string;
    subscriptions: Subscription[];
    categories?: string[]; // Optional custom categories per profile
}

export const DEFAULT_CATEGORIES = [
    'Streaming',
    'Utility Bills',
    'Software & Apps',
    'Housing & Rent',
    'Gaming & Social',
    'Auto Loan',
    'Shopping & Retail',
    'Transportation',
    'Finance & Insurance',
    'Health & Wellness',
    'News & Education',
    'Food & Dining',
    'Other'
];

// Supported currencies (ISO 4217)
export interface CurrencyInfo {
    code: string;
    symbol: string;
    name: string;
}

export const POPULAR_CURRENCY_CODES = [
    'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CNY', 'INR', 'MXN', 'BRL', 'SGD', 'HKD', 'NZD', 'CHF', 'SEK', 'NOK', 'KRW'
] as const;

export const SUPPORTED_CURRENCIES: readonly CurrencyInfo[] = [
    // Major & Popular Currencies
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
    { code: 'HKD', symbol: '$', name: 'Hong Kong Dollar' },
    { code: 'SGD', symbol: '$', name: 'Singapore Dollar' },
    { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
    { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
    { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
    { code: 'NZD', symbol: '$', name: 'New Zealand Dollar' },
    { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
    { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
    { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
    { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
    { code: 'THB', symbol: '฿', name: 'Thai Baht' },
    { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
    { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
    { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
    { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
    { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
    { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
    { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
    { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
    { code: 'COP', symbol: '$', name: 'Colombian Peso' },
    { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound' },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
    { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
    { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
    { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol' },
    { code: 'QAR', symbol: 'QR', name: 'Qatari Riyal' },
    { code: 'KWD', symbol: 'KD', name: 'Kuwaiti Dinar' },
    { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev' },
    { code: 'RON', symbol: 'lei', name: 'Romanian Leu' },

    // All Global Currencies (Alphabetical)
    { code: 'AFN', symbol: '؋', name: 'Afghan Afghani' },
    { code: 'ALL', symbol: 'L', name: 'Albanian Lek' },
    { code: 'AMD', symbol: '֏', name: 'Armenian Dram' },
    { code: 'ANG', symbol: 'ƒ', name: 'Netherlands Antillean Guilder' },
    { code: 'AOA', symbol: 'Kz', name: 'Angolan Kwanza' },
    { code: 'AWG', symbol: 'ƒ', name: 'Aruban Florin' },
    { code: 'AZN', symbol: '₼', name: 'Azerbaijani Manat' },
    { code: 'BAM', symbol: 'KM', name: 'Bosnia-Herzegovina Convertible Mark' },
    { code: 'BBD', symbol: '$', name: 'Barbadian Dollar' },
    { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
    { code: 'BHD', symbol: 'BD', name: 'Bahraini Dinar' },
    { code: 'BIF', symbol: 'FBu', name: 'Burundian Franc' },
    { code: 'BMD', symbol: '$', name: 'Bermudan Dollar' },
    { code: 'BND', symbol: '$', name: 'Brunei Dollar' },
    { code: 'BOB', symbol: 'Bs.', name: 'Bolivian Boliviano' },
    { code: 'BSD', symbol: '$', name: 'Bahamian Dollar' },
    { code: 'BTN', symbol: 'Nu.', name: 'Bhutanese Ngultrum' },
    { code: 'BWP', symbol: 'P', name: 'Botswanan Pula' },
    { code: 'BYN', symbol: 'Br', name: 'Belarusian Ruble' },
    { code: 'BZD', symbol: '$', name: 'Belize Dollar' },
    { code: 'CDF', symbol: 'FC', name: 'Congolese Franc' },
    { code: 'CRC', symbol: '₡', name: 'Costa Rican Colón' },
    { code: 'CUP', symbol: '$', name: 'Cuban Peso' },
    { code: 'CVE', symbol: '$', name: 'Cape Verdean Escudo' },
    { code: 'DJF', symbol: 'Fdj', name: 'Djiboutian Franc' },
    { code: 'DOP', symbol: '$', name: 'Dominican Peso' },
    { code: 'DZD', symbol: 'DA', name: 'Algerian Dinar' },
    { code: 'ERN', symbol: 'Nfk', name: 'Eritrean Nakfa' },
    { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr' },
    { code: 'FJD', symbol: '$', name: 'Fijian Dollar' },
    { code: 'FKP', symbol: '£', name: 'Falkland Islands Pound' },
    { code: 'GEL', symbol: '₾', name: 'Georgian Lari' },
    { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi' },
    { code: 'GIP', symbol: '£', name: 'Gibraltar Pound' },
    { code: 'GMD', symbol: 'D', name: 'Gambian Dalasi' },
    { code: 'GNF', symbol: 'FG', name: 'Guinean Franc' },
    { code: 'GTQ', symbol: 'Q', name: 'Guatemalan Quetzal' },
    { code: 'GYD', symbol: '$', name: 'Guyanaese Dollar' },
    { code: 'HNL', symbol: 'L', name: 'Honduran Lempira' },
    { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna' },
    { code: 'HTG', symbol: 'G', name: 'Haitian Gourde' },
    { code: 'IQD', symbol: 'ID', name: 'Iraqi Dinar' },
    { code: 'IRR', symbol: '﷼', name: 'Iranian Rial' },
    { code: 'ISK', symbol: 'kr', name: 'Icelandic Króna' },
    { code: 'JMD', symbol: '$', name: 'Jamaican Dollar' },
    { code: 'JOD', symbol: 'JD', name: 'Jordanian Dinar' },
    { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
    { code: 'KGS', symbol: 'с', name: 'Kyrgystani Som' },
    { code: 'KHR', symbol: '៛', name: 'Cambodian Riel' },
    { code: 'KMF', symbol: 'CF', name: 'Comorian Franc' },
    { code: 'KPW', symbol: '₩', name: 'North Korean Won' },
    { code: 'KYD', symbol: '$', name: 'Cayman Islands Dollar' },
    { code: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge' },
    { code: 'LAK', symbol: '₭', name: 'Laotian Kip' },
    { code: 'LBP', symbol: 'L£', name: 'Lebanese Pound' },
    { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee' },
    { code: 'LRD', symbol: '$', name: 'Liberian Dollar' },
    { code: 'LSL', symbol: 'M', name: 'Lesotho Loti' },
    { code: 'LYD', symbol: 'LD', name: 'Libyan Dinar' },
    { code: 'MAD', symbol: 'MAD', name: 'Moroccan Dirham' },
    { code: 'MDL', symbol: 'lei', name: 'Moldovan Leu' },
    { code: 'MGA', symbol: 'Ar', name: 'Malagasy Ariary' },
    { code: 'MKD', symbol: 'ден', name: 'Macedonian Denar' },
    { code: 'MMK', symbol: 'K', name: 'Myanmar Kyat' },
    { code: 'MNT', symbol: '₮', name: 'Mongolian Tugrik' },
    { code: 'MOP', symbol: 'MOP$', name: 'Macanese Pataca' },
    { code: 'MRU', symbol: 'UM', name: 'Mauritanian Ouguiya' },
    { code: 'MUR', symbol: 'Rs', name: 'Mauritian Rupee' },
    { code: 'MVR', symbol: 'Rf', name: 'Maldivian Rufiyaa' },
    { code: 'MWK', symbol: 'MK', name: 'Malawian Kwacha' },
    { code: 'MZN', symbol: 'MT', name: 'Mozambican Metical' },
    { code: 'NAD', symbol: '$', name: 'Namibian Dollar' },
    { code: 'NIO', symbol: 'C$', name: 'Nicaraguan Córdoba' },
    { code: 'NPR', symbol: 'Rs', name: 'Nepalese Rupee' },
    { code: 'OMR', symbol: 'RO', name: 'Omani Rial' },
    { code: 'PAB', symbol: 'B/.', name: 'Panamanian Balboa' },
    { code: 'PGK', symbol: 'K', name: 'Papua New Guinean Kina' },
    { code: 'PKR', symbol: 'Rs', name: 'Pakistani Rupee' },
    { code: 'PYG', symbol: '₲', name: 'Paraguayan Guarani' },
    { code: 'RSD', symbol: 'дин.', name: 'Serbian Dinar' },
    { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
    { code: 'RWF', symbol: 'RF', name: 'Rwandan Franc' },
    { code: 'SBD', symbol: '$', name: 'Solomon Islands Dollar' },
    { code: 'SCR', symbol: 'SR', name: 'Seychellois Rupee' },
    { code: 'SDG', symbol: 'SDG', name: 'Sudanese Pound' },
    { code: 'SHP', symbol: '£', name: 'St. Helena Pound' },
    { code: 'SLL', symbol: 'Le', name: 'Sierra Leonean Leone' },
    { code: 'SOS', symbol: 'S', name: 'Somali Shilling' },
    { code: 'SRD', symbol: '$', name: 'Surinamese Dollar' },
    { code: 'SSP', symbol: '£', name: 'South Sudanese Pound' },
    { code: 'STN', symbol: 'Db', name: 'São Tomé & Príncipe Dobra' },
    { code: 'SYP', symbol: '£S', name: 'Syrian Pound' },
    { code: 'SZL', symbol: 'E', name: 'Swazi Lilangeni' },
    { code: 'TJS', symbol: 'SM', name: 'Tajikistani Somoni' },
    { code: 'TMT', symbol: 'T', name: 'Turkmenistani Manat' },
    { code: 'TND', symbol: 'DT', name: 'Tunisian Dinar' },
    { code: 'TOP', symbol: 'T$', name: 'Tongan Paʻanga' },
    { code: 'TTD', symbol: '$', name: 'Trinidad & Tobago Dollar' },
    { code: 'TWD', symbol: '$', name: 'New Taiwan Dollar' },
    { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling' },
    { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia' },
    { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling' },
    { code: 'UYU', symbol: '$', name: 'Uruguayan Peso' },
    { code: 'UZS', symbol: 'soʻm', name: 'Uzbekistani Som' },
    { code: 'VES', symbol: 'Bs.', name: 'Venezuelan Bolívar' },
    { code: 'VUV', symbol: 'VT', name: 'Vanuatu Vatu' },
    { code: 'WST', symbol: 'WS$', name: 'Samoan Tala' },
    { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc' },
    { code: 'XCD', symbol: '$', name: 'East Caribbean Dollar' },
    { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    { code: 'XPF', symbol: 'CFPF', name: 'CFP Franc' },
    { code: 'YER', symbol: '﷼', name: 'Yemeni Rial' },
    { code: 'ZMW', symbol: 'ZK', name: 'Zambian Kwacha' },
    { code: 'ZWL', symbol: '$', name: 'Zimbabwean Dollar' },
] as const;

export function getCurrencySymbol(currencyCode?: string | null): string {
    if (!currencyCode) return '$';
    const normalized = currencyCode.trim().toUpperCase();
    if (!normalized) return '$';
    const currency = SUPPORTED_CURRENCIES.find(c => c.code === normalized);
    return currency?.symbol || (normalized.length <= 4 ? normalized : '$');
}
