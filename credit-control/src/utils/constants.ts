export const defaultersBackgroundImage = `linear-gradient(rgba(33, 150, 243, 1.7), rgba(66, 165, 245, 0.7)),
url("data:image/svg+xml,%3Csvg 
xmlns='http://www.w3.org/2000/svg' 
width='100' height='100' viewBox='0 0 200 210'%3E%3Cg 
transform='rotate(120 90 90)'%3E%3Crect x='2' y='80' 
width='90' height='60' fill='%232196F3'/%3E%3Crect 
x='60' y='30' width='70' height='40' fill='%2342A5F5'/%3E%3C/g%3E%3C/svg%3E")`;

export const months = [...Array(12).keys()].map(key => new Date(0, key).toLocaleString('en', { month: 'long' }));
export const currentMonth = new Date().toLocaleString('en', { month: 'long' });
export const currentYear = new Date().getFullYear();
