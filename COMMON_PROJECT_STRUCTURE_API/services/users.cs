using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using MySql.Data.MySqlClient;

namespace COMMON_PROJECT_STRUCTURE_API.services
{
    public class users
    {
        dbServices ds = new dbServices();

         public async Task<responseData> GetUserByEmail(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.BuildHomeEasyUser WHERE email=@email";

                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@email", rData.addInfo["email"]) // Ensure rData contains the id field
                };

                var dbData = ds.executeSQL(query, myParam);

                if (dbData == null)
                {
                    resData.rData["rMessage"] = "Database query returned null";
                    resData.rStatus = 1; // Indicate error
                    return resData;
                }

                List<object> usersList = new List<object>();

                foreach (var rowSet in dbData)
                {
                    if (rowSet != null)
                    {
                        foreach (var row in rowSet)
                        {
                            if (row != null)
                            {
                                List<string> rowData = new List<string>();

                                foreach (var column in row)
                                {
                                    if (column != null)
                                    {
                                        rowData.Add(column.ToString());
                                    }
                                }

                                var user = new
                                {
                                    // id, first_name, last_name, gender, email, password, contact, street_address1, street_address2, city, state, pincode, country, profile
                                    id = rowData.ElementAtOrDefault(0),
                                    first_name = rowData.ElementAtOrDefault(1),
                                    last_name = rowData.ElementAtOrDefault(2),
                                    gender = rowData.ElementAtOrDefault(3),
                                    email = rowData.ElementAtOrDefault(4),
                                    password = rowData.ElementAtOrDefault(5),
                                    contact = rowData.ElementAtOrDefault(6),
                                    street_address1 = rowData.ElementAtOrDefault(7),
                                    street_address2 = rowData.ElementAtOrDefault(8),
                                    city = rowData.ElementAtOrDefault(9),
                                    state = rowData.ElementAtOrDefault(10),
                                    pincode = rowData.ElementAtOrDefault(11),
                                    country = rowData.ElementAtOrDefault(12),
                                    profile=rowData.ElementAtOrDefault(13)
                                    // date = rowData.ElementAtOrDefault(14)
                                };

                                usersList.Add(user);
                            }
                        }
                    }
                }

                resData.rData["users"] = usersList;
                resData.rData["rMessage"] = "Successful";
                resData.rStatus = 0; // Indicate success
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "Exception occurred: " + ex.Message;
                resData.rStatus = 1; // Indicate error
            }

            return resData;
        }

        public async Task<responseData> GetAllUsers(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.BuildHomeEasyUser ORDER BY id DESC";
                var dbData = ds.executeSQL(query, null);

                if (dbData == null)
                {
                    resData.rData["rMessage"] = "Database query returned null";
                    resData.rStatus = 1; // Indicate error
                    return resData;
                }

                List<object> usersList = new List<object>();

                foreach (var rowSet in dbData)
                {
                    if (rowSet != null)
                    {
                        foreach (var row in rowSet)
                        {
                            if (row != null)
                            {
                                List<string> rowData = new List<string>();

                                foreach (var column in row)
                                {
                                    if (column != null)
                                    {
                                        rowData.Add(column.ToString());
                                    }
                                }

                                var user = new
                                {
                                    // id, first_name, last_name, gender, email, password, contact, street_address1, street_address2, city, state, pincode, country, profile
                                    id = rowData.ElementAtOrDefault(0),
                                    first_name = rowData.ElementAtOrDefault(1),
                                    last_name = rowData.ElementAtOrDefault(2),
                                    gender = rowData.ElementAtOrDefault(3),
                                    email = rowData.ElementAtOrDefault(4),
                                    password = rowData.ElementAtOrDefault(5),
                                    contact = rowData.ElementAtOrDefault(6),
                                    street_address1 = rowData.ElementAtOrDefault(7),
                                    street_address2 = rowData.ElementAtOrDefault(8),
                                    city = rowData.ElementAtOrDefault(9),
                                    state = rowData.ElementAtOrDefault(10),
                                    pincode = rowData.ElementAtOrDefault(11),
                                    country = rowData.ElementAtOrDefault(12),
                                    profile = rowData.ElementAtOrDefault(13)
                                    // date = rowData.ElementAtOrDefault(14)
                                };

                                usersList.Add(user);
                            }
                        }
                    }
                }

                resData.rData["users"] = usersList;
                resData.rData["rMessage"] = "Successful";
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "Exception occurred: " + ex.Message;
                resData.rStatus = 1; // Indicate error
            }

            return resData;
        }

        public async Task<responseData> DeleteUser(requestData rData)
        {
            responseData resData = new responseData();

            try
            {
                // Your delete query
                var query = @"DELETE FROM pc_student.BuildHomeEasyUser 
                            WHERE id = @Id;";

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

        public async Task<responseData> UpdateUserById(requestData rData)
        {
            responseData resData = new responseData();

            try
            {
                // id, first_name, last_name, gender, email, password, contact, street_address1, street_address2, city, state, pincode, country, profile
                
                var query = @"UPDATE pc_student.BuildHomeEasyUser 
                            SET first_name = @FIRST_NAME, 
                                  last_name = @LAST_NAME,
                                  gender=@gender, 
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
                            WHERE id = @id;";

                MySqlParameter[] myParam = new MySqlParameter[]
                {

                    new MySqlParameter("@id", rData.addInfo["id"]),
                    new MySqlParameter("@FIRST_NAME", rData.addInfo["first_name"]),
                    new MySqlParameter("@LAST_NAME", rData.addInfo["last_name"]),
                    new MySqlParameter("@gender", rData.addInfo["gender"]),
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

                bool shouldExecuteUpdate = true;

                if (shouldExecuteUpdate)
                {
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

    }
}

