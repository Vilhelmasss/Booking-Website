using VSBDT.Models.Enums;

namespace VSBDT.Services;

public static class HotelCalculator
{
    private const float StandardPrice = 100f;
    private const float DeluxePrice = 150f;
    private const float SuitePrice = 200f;
    private const float CleaningFee = 20f;
    private const float BreakfastFee = 15f;

    public static float GetHotelPrice(HotelType type, bool breakfastIncluded, int numberOfPersons, DateTime startDate, DateTime endDate)
    {
        float dailyPrice = 0f;

        switch (type)
        {
            case HotelType.Standard:
                dailyPrice = StandardPrice;
                break;
            case HotelType.Deluxe:
                dailyPrice = DeluxePrice;
                break;
            case HotelType.Suite:
                dailyPrice = SuitePrice;
                break;
            default:
                throw new ArgumentException("Enumerator not properly assigned.");
        }

        int numberOfDays = GetStayLength(startDate, endDate);

        float totalPrice = dailyPrice * numberOfDays;

        if (breakfastIncluded)
            totalPrice += numberOfPersons * BreakfastFee * numberOfDays;

        totalPrice += CleaningFee;

        return totalPrice;
    }

    public static int GetStayLength(DateTime startDate, DateTime endDate)
    {
        TimeSpan duration = endDate - startDate;
        return (int)Math.Ceiling(duration.TotalDays);
    }
}
