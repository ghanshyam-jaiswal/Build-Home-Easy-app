
using System.ComponentModel.DataAnnotations;
using System.Net.Sockets;
using System.Text.Json;
using COMMON_PROJECT_STRUCTURE_API.services;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebHost.CreateDefaultBuilder(args)
    .ConfigureServices(s =>
    {
        IConfiguration appsettings = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        s.AddSingleton<login>();
        s.AddSingleton<signup>();
        s.AddSingleton<update>();
        s.AddSingleton<LoginService>();
        s.AddSingleton<delete>();
        s.AddSingleton<contact>();
        s.AddSingleton<users>();
        // s.AddSingleton<users>();
        s.AddSingleton<admin>();
        s.AddSingleton<product>();
        s.AddSingleton<addToCart>();
        s.AddSingleton<countData>();
        s.AddSingleton<dbServices>();


        s.AddAuthorization();
        s.AddControllers();
        s.AddCors();

        s.AddLogging(logging =>
        {
            logging.ClearProviders(); // Clear the default logging providers
            logging.AddConsole();
            logging.AddDebug();
        });

        // s.AddAuthentication("SourceJWT").AddScheme<SourceJwtAuthenticationSchemeOptions, SourceJwtAuthenticationHandler>("SourceJWT", options =>
        // {
        //     options.SecretKey = appsettings["jwt_config:Key"].ToString();
        //     options.ValidIssuer = appsettings["jwt_config:Issuer"].ToString();
        //     options.ValidAudience = appsettings["jwt_config:Audience"].ToString();
        //     options.Subject = appsettings["jwt_config:Subject"].ToString();
        // });
        
    })
    .Configure(app =>
    {
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseCors(options =>
            options.WithOrigins("https://localhost:5002", "http://localhost:5001","http://localhost:5173")
            // .AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            .AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
        app.UseRouting();
        app.UseStaticFiles();
        

        app.UseEndpoints(e =>
        {
            var login = e.ServiceProvider.GetRequiredService<login>();
            var loginService = e.ServiceProvider.GetRequiredService<LoginService>();
            var signup = e.ServiceProvider.GetRequiredService<signup>();
            var update = e.ServiceProvider.GetRequiredService<update>();
            var contact = e.ServiceProvider.GetRequiredService<contact>();
            var users = e.ServiceProvider.GetRequiredService<users>();
            var deleteService = e.ServiceProvider.GetRequiredService<delete>();
            var productService = e.ServiceProvider.GetRequiredService<product>();
            // var user = e.ServiceProvider.GetRequiredService<users>();
            var addToCart = e.ServiceProvider.GetRequiredService<addToCart>();
            var admin = e.ServiceProvider.GetRequiredService<admin>();
            var countData = e.ServiceProvider.GetRequiredService<countData>();

            e.MapPost("login",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                if (rData.eventID == "1001") // update
                    await http.Response.WriteAsJsonAsync(await login.Login(rData));
            });

            e.MapPost("homeCountContact",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received signup request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // signup
                    await http.Response.WriteAsJsonAsync(await countData.CountContact(rData));
            });

            e.MapPost("homeCountItems",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received signup request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // signup
                    await http.Response.WriteAsJsonAsync(await countData.CountItems(rData));
            });

            e.MapPost("homeCountUsers",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received signup request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // signup
                    await http.Response.WriteAsJsonAsync(await countData.CountUsers(rData));
            });

            e.MapPost("homeCountAddToCart",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received signup request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // signup
                    await http.Response.WriteAsJsonAsync(await countData.CountAddToCart(rData));
            });

            e.MapPost("homeCountTotalIncome",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received signup request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // signup
                    await http.Response.WriteAsJsonAsync(await countData.CountTotalIncome(rData));
            });

            e.MapPost("homeLogin",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);

                if (rData.eventID == "1001") // LoginService
                {
                    var email = rData.addInfo["email"].ToString();
                    var password = rData.addInfo["password"].ToString();
                    var result = await loginService.Authenticate(email, password);
                    await http.Response.WriteAsJsonAsync(result);
                }
            });
            e.MapPost("homeAdminLogin",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);

                if (rData.eventID == "1001") // LoginService
                {
                    var email = rData.addInfo["email"].ToString();
                    var password = rData.addInfo["password"].ToString();
                    var result = await loginService.AdminLogin(email, password);
                    await http.Response.WriteAsJsonAsync(result);
                }
            });

            e.MapPost("homeGetUserByEmail",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);

                if (rData.eventID == "1001") // getUserByEmail
                {
                    var email = rData.addInfo["email"].ToString();
                    var result = await users.GetUserByEmail(rData);
                    await http.Response.WriteAsJsonAsync(result);
                }
            });

            e.MapPost("homeGetAdminByEmail",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);

                if (rData.eventID == "1001") // getUserByEmail
                {
                    var email = rData.addInfo["email"].ToString();
                    var result = await admin.GetAdminByEmail(rData);
                    await http.Response.WriteAsJsonAsync(result);
                }
            });


            e.MapPost("homeSignup",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received signup request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // signup
                    await http.Response.WriteAsJsonAsync(await signup.Signup(rData));
            });

            e.MapPost("adminSignup",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received signup request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // signup
                    await http.Response.WriteAsJsonAsync(await signup.AdminSignup(rData));
            });

            e.MapPost("homeContact",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received contact request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // contact
                    await http.Response.WriteAsJsonAsync(await contact.Contact(rData));
            });

            e.MapPost("homeGetAllContact",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received contact request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // contact
                    await http.Response.WriteAsJsonAsync(await contact.GetAllContact(rData));
            });

           

            e.MapPost("homeDeleteContact",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received contact request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // contact
                    await http.Response.WriteAsJsonAsync(await contact.DeleteContact(rData));
            });

            e.MapPost("homeGetAllUsers",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received get users request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // getUsers
                {
                    // Call the GetAllUsers method directly and return its result as JSON response
                    await http.Response.WriteAsJsonAsync(await users.GetAllUsers(rData));
                }
            });

            e.MapPost("homeDeleteUser",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received get users request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // getUsers
                {
                    // Call the GetAllUsers method directly and return its result as JSON response
                    await http.Response.WriteAsJsonAsync(await users.DeleteUser(rData));
                }
            });
            e.MapPost("homeUpdateUserById",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received get users request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // getUsers
                {
                    // Call the GetAllUsers method directly and return its result as JSON response
                    await http.Response.WriteAsJsonAsync(await users.UpdateUserById(rData));
                }
            });

            e.MapPost("homeAddToCart",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received get users request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // addProduct
                {
                    // Call the GetAllUsers method directly and return its result as JSON response
                    await http.Response.WriteAsJsonAsync(await addToCart.AddCart(rData));
                }
            });

            e.MapPost("homeGetAllCarts",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received get users request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // addProduct
                {
                    // Call the GetAllUsers method directly and return its result as JSON response
                    await http.Response.WriteAsJsonAsync(await addToCart.GetAllCarts(rData));
                }
            });

            e.MapPost("homeGetAllAddedCartById",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received get users request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // addProduct
                {
                    // Call the GetAllUsers method directly and return its result as JSON response
                    await http.Response.WriteAsJsonAsync(await addToCart.GetAllAddedCartById(rData));
                }
            });

            e.MapPost("homeDeleteCartById",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received get users request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // addProduct
                {
                    // Call the GetAllUsers method directly and return its result as JSON response
                    await http.Response.WriteAsJsonAsync(await addToCart.DeleteCartById(rData));
                }
            });

            e.MapPost("homeUpdateCartById",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received get users request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // addProduct
                {
                    // Call the GetAllUsers method directly and return its result as JSON response
                    await http.Response.WriteAsJsonAsync(await addToCart.UpdateCartById(rData));
                }
            });

            e.MapPost("homeAddItem",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received get users request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // addProduct
                {
                    // Call the GetAllUsers method directly and return its result as JSON response
                    await http.Response.WriteAsJsonAsync(await productService.AddItem(rData));
                }
            });

             e.MapPost("homeGetItemByName",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received contact request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // contact
                    await http.Response.WriteAsJsonAsync(await productService.GetItemByName(rData));
            });

             e.MapPost("homeGetAllItems",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received contact request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // contact
                    await http.Response.WriteAsJsonAsync(await productService.GetAllItems(rData));
            });

             e.MapPost("homeGetAllItemName",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received contact request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1002") // contact
                    await http.Response.WriteAsJsonAsync(await productService.GetAllItemName(rData));
            });

             e.MapPost("homeUpdateItemById",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received contact request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // contact
                    await http.Response.WriteAsJsonAsync(await productService.UpdateItemById(rData));
            });

             e.MapPost("homeDeleteItem",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received contact request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // contact
                    await http.Response.WriteAsJsonAsync(await productService.DeleteItem(rData));
            });

            e.MapPost("homeAddChildItem",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received get users request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // addProduct
                {
                    // Call the GetAllUsers method directly and return its result as JSON response
                    await http.Response.WriteAsJsonAsync(await productService.AddChildItem(rData));
                }
            });

             e.MapPost("homeGetAllChildItemsById",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received contact request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // contact
                    await http.Response.WriteAsJsonAsync(await productService.GetAllChildItemsById(rData));
            });

             e.MapPost("homeUpdateChildItemById",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received contact request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // contact
                    await http.Response.WriteAsJsonAsync(await productService.UpdateChildItemById(rData));
            });

             e.MapPost("homeDeleteChildItem",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received contact request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // contact
                    await http.Response.WriteAsJsonAsync(await productService.DeleteChildItem(rData));
            });

             e.MapPost("homeDeleteChildItem2",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received contact request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // contact
                    await http.Response.WriteAsJsonAsync(await productService.DeleteChildItem2(rData));
            });

             e.MapPost("getProductById",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received contact request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // contact
                    await http.Response.WriteAsJsonAsync(await productService.GetProductById(rData));
            });

            
            

            e.MapPost("updateById",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                if (rData.eventID == "1001") // update
                    await http.Response.WriteAsJsonAsync(await update.UpdateById(rData));
            });

            e.MapPost("updateUserPhotoById",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                if (rData.eventID == "1001") // update
                    await http.Response.WriteAsJsonAsync(await update.UpdateUserPhotoById(rData));
            });

            e.MapPost("delete",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                var rData = JsonSerializer.Deserialize<requestData>(body);
                if (rData.eventID == "1001") // delete
                {
                    await http.Response.WriteAsJsonAsync(await deleteService.Delete(rData));
                }
            });

            e.MapPost("deleteUserPhoto",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                var rData = JsonSerializer.Deserialize<requestData>(body);
                if (rData.eventID == "1001") // delete
                {
                    await http.Response.WriteAsJsonAsync(await deleteService.DeleteUserPhoto(rData));
                }
            });

            IConfiguration appsettings = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            e.MapGet("/dbstring",
                async c =>
                {
                    dbServices dspoly = new();
                    await c.Response.WriteAsJsonAsync("{'mongoDatabase':" + appsettings["mongodb:connStr"] + "," + " " + "MYSQLDatabase" + " =>" + appsettings["db:connStrPrimary"]);
                });

            e.MapGet("/bing",
                async c => await c.Response.WriteAsJsonAsync("{'Name':'Anish','Age':'26','Project':'COMMON_PROJECT_STRUCTURE_API'}"));
        });
    });

builder.Build().Run();

public record requestData
{
    [Required]
    public string eventID { get; set; }
    [Required]
    public IDictionary<string, object> addInfo { get; set; }
}

public record responseData
{
    public responseData()
    {
        eventID = "";
        rStatus = 0;
        rData = new Dictionary<string, object>();
    }
    [Required]
    public int rStatus { get; set; } = 0;
    public string eventID { get; set; }
    public IDictionary<string, object> addInfo { get; set; }
    public IDictionary<string, object> rData { get; set; }
}


