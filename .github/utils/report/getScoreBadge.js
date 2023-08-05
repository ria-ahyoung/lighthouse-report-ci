const COLOR_OBJ = {
  'good': '00cc00',
  'warn': 'ff9900',
  'high': 'ff5555',
};

export default function getScoreBadge(res) { 
  const scoreColor = res >= 90 ? 'good' : res >= 50 ? 'warn' : 'high';
  const btnStyle = `-${scoreColor}-${COLOR_OBJ[scoreColor]}`;

  return `[![Badge](https://img.shields.io/badge/${btnStyle})](#)`;
}