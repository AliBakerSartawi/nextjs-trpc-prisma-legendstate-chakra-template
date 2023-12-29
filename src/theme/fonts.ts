import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const fonts = { primary: poppins };
