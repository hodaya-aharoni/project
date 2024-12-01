//פונקציה המקבלת סכום,סוג,ושער דולר ואם הערך שווה לשקל אז ממיר משקל לדולר
export function fromSekelToX(sum, type, rate) {
    return type == "S" ? sum :  sum/rate
}
// פונקציה המקבלת סכום,סוג,ושער דולר ואם הערך שווה לדולר אז ממיר מדולר לשקל
//ואם לא אז מחזירה בשקלים
export function checkCoins(type,rate,sum){
    if (type=="D") 
        return sum*rate;
    return sum;
}

//מחזירה את ההבדל בימים שעות ודקות בהתאם לזמן שעבר מהתאריך הנוכחי לנתון
//אם ההבדל הוא בימים-הפונקציה מחזירה את ההבדל בימים ושעות
// אם ההבדל הוא שעות או דקות היא מחזירה את ההבדל בזמן המתאים
export function dateDiff(date) {
    let now = new Date();
    let givenDate = new Date(date);
    let dateDiffMs = givenDate - now;

    let daysDiff = Math.floor(Math.abs(dateDiffMs) / (1000 * 60 * 60 * 24));
    let remainingMsAfterDays = Math.abs(dateDiffMs) % (1000 * 60 * 60 * 24);

    let hoursDiff = Math.floor(remainingMsAfterDays / (1000 * 60 * 60));
    let remainingMsAfterHours = remainingMsAfterDays % (1000 * 60 * 60);

    let minutesDiff = Math.floor(remainingMsAfterHours / (1000 * 60));

    if (daysDiff > 0) {
      return `Before ${daysDiff} days, ${hoursDiff} hours`;
    }
    else if (hoursDiff > 0) {
      return `Before ${hoursDiff} hours, ${minutesDiff} minutes`;
    }
    else {
      return `Before ${minutesDiff} minutes`;
    }
  }
  

