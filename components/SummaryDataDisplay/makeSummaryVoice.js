const makeSummaryVoice = (summary) => {
  const { prefix, steps, floors, fairlyActiveMinutes, veryActiveMinutes, sedentaryMinutes } = summary || {};
  const fairlyActiveTime = fairlyActiveMinutes >= 60 ? `${(fairlyActiveMinutes/60).toFixed(1)} hours` : `${fairlyActiveMinutes} minutes`;
  const veryActiveTime = veryActiveMinutes >= 60 ? `${(veryActiveMinutes/60).toFixed(1)} hours` : `${veryActiveMinutes} minutes`;
  const sedentaryTime = sedentaryMinutes >= 60 ? `${(sedentaryMinutes/60).toFixed(1)} hours` : `${sedentaryMinutes} minutes`;

  const stepsStr = `${prefix} You walked ${steps} steps and ${floors} floors.   `;
  const fairlyActiveStr = fairlyActiveMinutes ? `You were fairly active for ${fairlyActiveTime}.   `: '';
  const veryActiveStr = veryActiveMinutes ? `You were very active ${veryActiveTime},  ` : '';
  const activeStatus = (!fairlyActiveMinutes && !veryActiveStr) ? "" : (fairlyActiveStr+veryActiveStr);
  const sedentaryStr = sedentaryMinutes ? `You were inactive for ${sedentaryTime}.  `: '';

  return stepsStr + activeStatus + sedentaryStr;
};

export default makeSummaryVoice;
