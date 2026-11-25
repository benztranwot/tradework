using Dapper;
using TradeWork.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

var connectionString =
    builder.Configuration.GetConnectionString("Default")
    ?? throw new InvalidOperationException("Missing ConnectionStrings:Default");
builder.Services.AddSingleton(new DbConnectionFactory(connectionString));

var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));

app.MapGet(
    "/health/db",
    async (DbConnectionFactory db) =>
    {
        await using var conn = db.Create();
        var result = await conn.ExecuteScalarAsync<int>("SELECT 1");
        return Results.Ok(new { database = result == 1 ? "connected" : "error" });
    }
);

app.Run();
