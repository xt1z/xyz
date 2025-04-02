document.addEventListener('DOMContentLoaded', () => {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const ampmElement = document.getElementById('ampm');
  
    // Format time units to ensure 2 digits
    const formatTimeUnit = (unit) => {
      return unit.toString().padStart(2, '0');
    };
  
    // Update clock
    const updateClock = () => {
      const now = new Date();
      
      // Bangkok time (GMT+7)
      const bangkokTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (7 * 3600000));
      
      const hours = bangkokTime.getHours();
      const minutes = bangkokTime.getMinutes();
      const seconds = bangkokTime.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      
      // Convert to 12-hour format
      const hours12 = hours % 12 || 12;
      
      hoursElement.textContent = hours12;
      minutesElement.textContent = formatTimeUnit(minutes);
      secondsElement.textContent = formatTimeUnit(seconds);
      ampmElement.textContent = ampm;
    };
  
    // Initial update
    updateClock();
    
    // Update every second
    setInterval(updateClock, 1000);
  });