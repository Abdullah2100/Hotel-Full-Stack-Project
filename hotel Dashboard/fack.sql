update
    Rooms
set
    case
        when @capacity > 0 then capacity = @capacity
    end,
    case
        when @bedNumber > 0 then bedNumber = @bedNumber
    end,
    case
        when @pricePerDay > 0 then pricePerDay = @pricePerDay
    end,
    addBy = @addBy,
    case
        when @floorNumber > 0 then floorNumber = @floorNumber
    end,
    case
        when @roomTypeID > 0 then roomTypeID = @roomTypeID
    end,
    case
        when @title > 0 then title = @title
    end,
    case
        when @description > 0 then description = @description
    end
where
    roomID = @id