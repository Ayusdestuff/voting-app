// this the basecolor of our app, the navbar and the buttons
export const baseColor = "#e67e22";

//this function generates random colors that will be used to draw our charts
export const generateRandomColor = () => {
  const strings = "0123456789abcdef".split('');
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += strings[Math.floor(Math.random()*strings.length)];
  }
  return color;
};
