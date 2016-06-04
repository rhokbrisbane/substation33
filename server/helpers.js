'use strict';

const calculateStatistics = (value) => { // value in kg
  return {
    employment:       value * 0.0897941305,
    work_experience:  value * 0.244986574
  };
};

const getRelevantEmailMessage = (type) => {
  let message = '';
  switch (type) {
    case 'social':
      message = 'hello, you\'re a social person';
      break;
    case 'environmental':
      message = 'hello, you\'re an environmental person';
      break;
    case undefined:
      message = 'hello, you don\t give a shit';
      break;
  }

  return message;
};

module.exports = {
  calculateStatistics:      calculateStatistics,
  getRelevantEmailMessage:  getRelevantEmailMessage
};
