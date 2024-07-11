using System;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Logging;


namespace COMMON_PROJECT_STRUCTURE_API.services
{
    public class update
    {
        private readonly dbServices _dbServices;
        private readonly ILogger<update> _logger;

        public update(dbServices dbServices, ILogger<update> logger)
        {
            _dbServices = dbServices;
            _logger = logger;
        }

        public async Task<string> UpdateByEmailAndPassword(requestData rData)
        {
            try
            {
                if (!rData.addInfo.ContainsKey("email") || !rData.addInfo.ContainsKey("password"))
                {
                    return "Invalid request data";
                }

                var email = rData.addInfo["email"].ToString();
                var password = rData.addInfo["password"].ToString();

                var query = @"UPDATE pc_student.RepaireStore 
                              SET user_id = @Id,
                                  first_name = @FIRST_NAME, 
                                  last_name = @LAST_NAME, 
                                  contact = @CONTACT, 
                                  street_address1 = @STREET_ADDRESS1, 
                                  street_address2 = @STREET_ADDRESS2, 
                                  city = @CITY, 
                                  state = @STATE, 
                                  pincode = @PINCODE, 
                                  country = @COUNTRY,
                                  profile = @PROFILE
                              WHERE email = @EMAIL AND password = @PASSWORD";

                MySqlParameter[] parameters = new MySqlParameter[]
                {
                    new MySqlParameter("@Id", rData.addInfo["user_id"]),
                    new MySqlParameter("@FIRST_NAME", rData.addInfo["first_name"]),
                    new MySqlParameter("@LAST_NAME", rData.addInfo["last_name"]),
                    new MySqlParameter("@EMAIL", rData.addInfo["email"]),
                    new MySqlParameter("@PASSWORD", rData.addInfo["password"]),
                    new MySqlParameter("@CONTACT", rData.addInfo["contact"]),
                    new MySqlParameter("@STREET_ADDRESS1", rData.addInfo["street_address1"]),
                    new MySqlParameter("@STREET_ADDRESS2", rData.addInfo["street_address2"]),
                    new MySqlParameter("@CITY", rData.addInfo["city"]),
                    new MySqlParameter("@STATE", rData.addInfo["state"]),
                    new MySqlParameter("@PINCODE", rData.addInfo["pincode"]),
                    new MySqlParameter("@COUNTRY", rData.addInfo["country"]),
                    new MySqlParameter("@PROFILE", rData.addInfo["profile"])
                };

                var (affectedRows, _) = await _dbServices.executeSQLForUpdate(query, parameters);
                if (affectedRows > 0)
                {
                    return "Update successful";
                }
                else
                {
                    return "No record found with the given email and password";
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception during update operation: {ex.Message}");
                return $"An error occurred: {ex.Message}";
            }
        }

        dbServices ds = new dbServices();
        public async Task<responseData> UpdateById(requestData rData)
        {
            responseData resData = new responseData();

            try
            {
                // Your update query
                var query = @"UPDATE pc_student.RepaireStore 
                            SET first_name = @FIRST_NAME, 
                                  last_name = @LAST_NAME, 
                                  email = @EMAIL,
                                  password = @PASSWORD,
                                  contact = @CONTACT, 
                                  street_address1 = @STREET_ADDRESS1, 
                                  street_address2 = @STREET_ADDRESS2, 
                                  city = @CITY, 
                                  state = @STATE, 
                                  pincode = @PINCODE, 
                                  country = @COUNTRY,
                                  profile = @PROFILE
                           WHERE user_id = @USER_ID;";

                // Your parameters
                MySqlParameter[] myParam = new MySqlParameter[]
                {

                    new MySqlParameter("@USER_ID", rData.addInfo["user_id"]),
                    new MySqlParameter("@FIRST_NAME", rData.addInfo["first_name"]),
                    new MySqlParameter("@LAST_NAME", rData.addInfo["last_name"]),
                    new MySqlParameter("@EMAIL", rData.addInfo["email"]),
                    new MySqlParameter("@PASSWORD", rData.addInfo["password"]),
                    new MySqlParameter("@CONTACT", rData.addInfo["contact"]),
                    new MySqlParameter("@STREET_ADDRESS1", rData.addInfo["street_address1"]),
                    new MySqlParameter("@STREET_ADDRESS2", rData.addInfo["street_address2"]),
                    new MySqlParameter("@CITY", rData.addInfo["city"]),
                    new MySqlParameter("@STATE", rData.addInfo["state"]),
                    new MySqlParameter("@PINCODE", rData.addInfo["pincode"]),
                    new MySqlParameter("@COUNTRY", rData.addInfo["country"]),
                    new MySqlParameter("@PROFILE", rData.addInfo["profile"])

                };

                // Condition to execute the update query
                bool shouldExecuteUpdate = true;

                if (shouldExecuteUpdate)
                {
                    // int rowsAffected = ds.ExecuteUpdateSQL(query, myParam);
                    int rowsAffected = ds.ExecuteUpdateSQL(query, myParam);

                    if (rowsAffected > 0)
                    {
                        resData.rData["rMessage"] = "UPDATE SUCCESSFULLY.";
                    }
                    else
                    {
                        resData.rData["rMessage"] = "No rows affected. Update failed.";
                    }
                }
                else
                {
                    resData.rData["rMessage"] = "Condition not met. Update query not executed.";
                }
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "Exception occurred: " + ex.Message;
            }
            return resData;
        }
        
        public async Task<responseData> UpdateUserPhotoById(requestData rData)
        {
            responseData resData = new responseData();

            try
            {
                // Your update query
                var query = @"UPDATE pc_student.RepaireStore 
                            SET profile = @PROFILE
                           WHERE user_id = @USER_ID;";

                // Your parameters
                MySqlParameter[] myParam = new MySqlParameter[]
                {

                    new MySqlParameter("@USER_ID", rData.addInfo["user_id"]),
                    new MySqlParameter("@PROFILE", rData.addInfo["profile"])

                };

                // Condition to execute the update query
                bool shouldExecuteUpdate = true;

                if (shouldExecuteUpdate)
                {
                    // int rowsAffected = ds.ExecuteUpdateSQL(query, myParam);
                    int rowsAffected = ds.ExecuteUpdateSQL(query, myParam);

                    if (rowsAffected > 0)
                    {
                        resData.rData["rMessage"] = "UPDATE SUCCESSFULLY.";
                    }
                    else
                    {
                        resData.rData["rMessage"] = "No rows affected. Update failed.";
                    }
                }
                else
                {
                    resData.rData["rMessage"] = "Condition not met. Update query not executed.";
                }
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "Exception occurred: " + ex.Message;
            }
            return resData;
        }

        public async Task<responseData> Delete(requestData rData)
        {
            responseData resData = new responseData();

            try
            {
                // Your delete query
                var query = @"DELETE FROM pc_student.giganexus WHERE id = @Id;";

                // Your parameters
                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@Id", rData.addInfo["id"])
                };

                // Condition to execute the delete query
                bool shouldExecuteDelete = true;

                if (shouldExecuteDelete)
                {
                    int rowsAffected = ds.ExecuteUpdateSQL(query, myParam);

                    if (rowsAffected > 0)
                    {
                        resData.rData["rMessage"] = "DELETE SUCCESSFULLY.";
                    }
                    else
                    {
                        resData.rData["rMessage"] = "No rows affected. Delete failed.";
                    }
                }
                else
                {
                    resData.rData["rMessage"] = "Condition not met. Delete query not executed.";
                }
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "Exception occurred: " + ex.Message;
            }
            return resData;
        }

    }
}
