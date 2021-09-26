export const sendRequest = async (url , configObj = null, errorMsg) => {
     const response = await fetch(url, configObj)
     const responseData = await response.json()
     
     if(!response.ok) {
          throw new Error(errorMsg)
     }

     return responseData
}

export const formatPrice = (price) => {
     const priceStr = price.toFixed(2)

     if(!priceStr.includes('.')) {
          return `$${priceStr}.00`
     } else {
          const [wholeNumber, decimal] = priceStr.split('.')
          return `$${wholeNumber}.${decimal.padEnd(2,'0')}`
     }
}

export const formatTitle = (title, maxLength) => {
     return title.length > maxLength ? `${title.slice(0, maxLength).trim()}...` : title
}

export const validateEmail = (email) => {
     const re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     return re.test(String(email).toLowerCase())
}

export const validateInput = (input, minLength, maxLength = undefined) => {
     const inputLength = input.trim().length

     return maxLength 
          ? inputLength >= minLength && inputLength <= maxLength
          : inputLength >= minLength
}

export const validatePhoneNumber = (phoneNum) => {
     const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
     return re.test(phoneNum)
}

export const validateForm = ({ email, firstname, lastname, address, city, postalCode, phoneNumber }) => {
     const isEmailValid = validateEmail(email)
     const isFirstnameValid = validateInput(firstname, 2)
     const isLastnameValid = validateInput(lastname, 2)
     const isAddressValid = validateInput(address, 1)
     const isCityValid = validateInput(city, 1)
     const isPostalCodeValid = validateInput(postalCode, 4, 10)
     const isPhoneNumberValid = validatePhoneNumber(phoneNumber)

     return isEmailValid && isFirstnameValid && isLastnameValid && isAddressValid && isCityValid && isPostalCodeValid && isPostalCodeValid && isPhoneNumberValid
}

export const createDate = () => {
     const date = new Date()
     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'May', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

     return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export const generateId = () => {
     return Math.random().toString(36).substr(2, 9)
}

export const COUNTRY_LIST = [
	'Afghanistan',
	'Albania',
	'Algeria',
	'American Samoa',
	'Andorra',
	'Angola',
	'Anguilla',
	'Antarctica',
	'Antigua and Barbuda',
	'Argentina',
	'Armenia',
	'Aruba',
	'Australia',
	'Austria',
	'Azerbaijan',
	'Bahamas (the)',
	'Bahrain',
	'Bangladesh',
	'Barbados',
	'Belarus',
	'Belgium',
	'Belize',
	'Benin',
	'Bermuda',
	'Bhutan',
	'Bolivia (Plurinational State of)',
	'Bonaire, Sint Eustatius and Saba',
	'Bosnia and Herzegovina',
	'Botswana',
	'Bouvet Island',
	'Brazil',
	'British Indian Ocean Territory (the)',
	'Brunei Darussalam',
	'Bulgaria',
	'Burkina Faso',
	'Burundi',
	'Cabo Verde',
	'Cambodia',
	'Cameroon',
	'Canada',
	'Cayman Islands (the)',
	'Central African Republic (the)',
	'Chad',
	'Chile',
	'China',
	'Christmas Island',
	'Cocos (Keeling) Islands (the)',
	'Colombia',
	'Comoros (the)',
	'Congo (the Democratic Republic of the)',
	'Congo (the)',
	'Cook Islands (the)',
	'Costa Rica',
	'Croatia',
	'Cuba',
	'Curaçao',
	'Cyprus',
	'Czechia',
	'Côte d\'Ivoire',
	'Denmark',
	'Djibouti',
	'Dominica',
	'Dominican Republic (the)',
	'Ecuador',
	'Egypt',
	'El Salvador',
	'Equatorial Guinea',
	'Eritrea',
	'Estonia',
	'Eswatini',
	'Ethiopia',
	'Falkland Islands (the) [Malvinas]',
	'Faroe Islands (the)',
	'Fiji',
	'Finland',
	'France',
	'French Guiana',
	'French Polynesia',
	'French Southern Territories (the)',
	'Gabon',
	'Gambia (the)',
	'Georgia',
	'Germany',
	'Ghana',
	'Gibraltar',
	'Greece',
	'Greenland',
	'Grenada',
	'Guadeloupe',
	'Guam',
	'Guatemala',
	'Guernsey',
	'Guinea',
	'Guinea-Bissau',
	'Guyana',
	'Haiti',
	'Heard Island and McDonald Islands',
	'Holy See (the)',
	'Honduras',
	'Hong Kong',
	'Hungary',
	'Iceland',
	'India',
	'Indonesia',
	'Iran (Islamic Republic of)',
	'Iraq',
	'Ireland',
	'Isle of Man',
	'Israel',
	'Italy',
	'Jamaica',
	'Japan',
	'Jersey',
	'Jordan',
	'Kazakhstan',
	'Kenya',
	'Kiribati',
	'Korea (the Democratic People\'s Republic of)',
	'Korea (the Republic of)',
	'Kuwait',
	'Kyrgyzstan',
	'Lao People\'s Democratic Republic (the)',
	'Latvia',
	'Lebanon',
	'Lesotho',
	'Liberia',
	'Libya',
	'Liechtenstein',
	'Lithuania',
	'Luxembourg',
	'Macao',
	'Madagascar',
	'Malawi',
	'Malaysia',
	'Maldives',
	'Mali',
	'Malta',
	'Marshall Islands (the)',
	'Martinique',
	'Mauritania',
	'Mauritius',
	'Mayotte',
	'Mexico',
	'Micronesia (Federated States of)',
	'Moldova (the Republic of)',
	'Monaco',
	'Mongolia',
	'Montenegro',
	'Montserrat',
	'Morocco',
	'Mozambique',
	'Myanmar',
	'Namibia',
	'Nauru',
	'Nepal',
	'Netherlands (the)',
	'New Caledonia',
	'New Zealand',
	'Nicaragua',
	'Niger (the)',
	'Nigeria',
	'Niue',
	'Norfolk Island',
	'Northern Mariana Islands (the)',
	'Norway',
	'Oman',
	'Pakistan',
	'Palau',
	'Palestine, State of',
	'Panama',
	'Papua New Guinea',
	'Paraguay',
	'Peru',
	'Philippines (the)',
	'Pitcairn',
	'Poland',
	'Portugal',
	'Puerto Rico',
	'Qatar',
	'Republic of North Macedonia',
	'Romania',
	'Russian Federation (the)',
	'Rwanda',
	'Réunion',
	'Saint Barthélemy',
	'Saint Helena, Ascension and Tristan da Cunha',
	'Saint Kitts and Nevis',
	'Saint Lucia',
	'Saint Martin (French part)',
	'Saint Pierre and Miquelon',
	'Saint Vincent and the Grenadines',
	'Samoa',
	'San Marino',
	'Sao Tome and Principe',
	'Saudi Arabia',
	'Senegal',
	'Serbia',
	'Seychelles',
	'Sierra Leone',
	'Singapore',
	'Sint Maarten (Dutch part)',
	'Slovakia',
	'Slovenia',
	'Solomon Islands',
	'Somalia',
	'South Africa',
	'South Georgia and the South Sandwich Islands',
	'South Sudan',
	'Spain',
	'Sri Lanka',
	'Sudan (the)',
	'Suriname',
	'Svalbard and Jan Mayen',
	'Sweden',
	'Switzerland',
	'Syrian Arab Republic',
	'Taiwan',
	'Tajikistan',
	'Tanzania, United Republic of',
	'Thailand',
	'Timor-Leste',
	'Togo',
	'Tokelau',
	'Tonga',
	'Trinidad and Tobago',
	'Tunisia',
	'Turkey',
	'Turkmenistan',
	'Turks and Caicos Islands (the)',
	'Tuvalu',
	'Uganda',
	'Ukraine',
	'United Arab Emirates (the)',
	'United Kingdom of Great Britain and Northern Ireland (the)',
	'United States Minor Outlying Islands (the)',
	'United States of America (the)',
	'Uruguay',
	'Uzbekistan',
	'Vanuatu',
	'Venezuela (Bolivarian Republic of)',
	'Viet Nam',
	'Virgin Islands (British)',
	'Virgin Islands (U.S.)',
	'Wallis and Futuna',
	'Western Sahara',
	'Yemen',
	'Zambia',
	'Zimbabwe',
	'Åland Islands'
]