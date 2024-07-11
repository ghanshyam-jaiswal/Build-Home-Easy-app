using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace COMMON_PROJECT_STRUCTURE_API.services
{
    public class LoginService
    {
        private readonly dbServices _dbServices;

        public LoginService(dbServices dbServices)
        {
            _dbServices = dbServices;
        }

        public async Task<string> Authenticate(string email, string password)
        {
            try
            {
                var query = @"SELECT * FROM pc_student.RepaireStore WHERE email=@Email AND password=@Password";
                MySqlParameter[] parameters = new MySqlParameter[]
                {
                    new MySqlParameter("@Email", email),
                    new MySqlParameter("@Password", password)
                };

                // var result = await _dbServices.executeSQL(query, parameters);
                var insertResult = _dbServices.executeSQL(query, parameters);
                
                if (insertResult[0].Count > 0)
                {
                    return "Login successful";
                }
                else
                {
                    return "Invalid email or password";
                }
            }
            catch (Exception ex)
            {
                return "An error occurred: " + ex.Message;
            }
        }

        public async Task<string> AdminLogin(string email, string password)
        {
            try
            {
                var query = @"SELECT * FROM pc_student.RepairStoreAdmin WHERE email=@Email AND password=@Password";
                MySqlParameter[] parameters = new MySqlParameter[]
                {
                    new MySqlParameter("@Email", email),
                    new MySqlParameter("@Password", password)
                };

                // var result = await _dbServices.executeSQL(query, parameters);
                var insertResult = _dbServices.executeSQL(query, parameters);
                
                if (insertResult[0].Count > 0)
                {
                    return "Login successful";
                }
                else
                {
                    return "Invalid email or password";
                }
            }
            catch (Exception ex)
            {
                return "An error occurred: " + ex.Message;
            }
        }
    }
}
