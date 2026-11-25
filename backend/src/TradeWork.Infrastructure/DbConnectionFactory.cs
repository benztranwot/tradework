using Npgsql;

namespace TradeWork.Infrastructure;

public sealed class DbConnectionFactory(string connectionString)
{
    public NpgsqlConnection Create() => new(connectionString);
}
