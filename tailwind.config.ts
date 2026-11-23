import type { Config } from 'tailwindcss';
export default {darkMode:'class',content:['./app/**/*.{ts,tsx}','./lib/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],theme:{extend:{fontFamily:{sans:['Inter','system-ui','Arial','sans-serif']},colors:{ink:'#1c2441',blue:'#5468f5',violet:'#8b5cf6'}}},plugins:[]} satisfies Config;
