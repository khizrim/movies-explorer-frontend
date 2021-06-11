function calcDuration(durationInMin) {
  const hours = Math.floor(durationInMin / 60);
  const minutes = Math.floor(durationInMin - hours * 60);

  return `${hours}ч ${minutes}м`;
}

export default calcDuration;
