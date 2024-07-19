using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;


namespace COMMON_PROJECT_STRUCTURE_API.services
{
    public class contact
    {
        dbServices ds = new dbServices();

        public async Task<responseData> Contact(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.BuildHomeEasyContact WHERE email=@email";
                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@email", rData.addInfo["email"])
                };
                var dbData = ds.executeSQL(query, myParam);
                
                if (dbData[0].Count() > 0)
                {
                    resData.rData["rMessage"] = "Duplicate Credentials";
                }
                else
                {
                   var sq = @"INSERT INTO pc_student.BuildHomeEasyContact (name, email, message) 
                               VALUES (@NAME, @EMAIL, @MESSAGE)";
                  MySqlParameter[] insertParams = new MySqlParameter[]
                    {
                        new MySqlParameter("@NAME", rData.addInfo["name"]),
                        new MySqlParameter("@EMAIL", rData.addInfo["email"]),
                        new MySqlParameter("@MESSAGE", rData.addInfo["message"]),
                        // new MySqlParameter("@dateAndTime", rData.addInfo["dateAndTime"]),
                    };
                    var insertResult = ds.executeSQL(sq, insertParams);

                    resData.rData["rMessage"] = "Successful";
                }
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "An error occurred: " + ex.Message;
            }
            return resData;
        }

        public async Task<responseData> GetAllContact(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.BuildHomeEasyContact ORDER BY id DESC";
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
                                    id = rowData.ElementAtOrDefault(0),
                                    name = rowData.ElementAtOrDefault(1),
                                    email = rowData.ElementAtOrDefault(2),
                                    message = rowData.ElementAtOrDefault(3),
                                    dateAndTime = rowData.ElementAtOrDefault(4),
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

        public async Task<responseData> DeleteContact(requestData rData)
        {
            responseData resData = new responseData();

            try
            {
                var query = @"DELETE FROM pc_student.BuildHomeEasyContact 
                            WHERE id = @Id;";

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