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

        public async Task<responseData> GetAllUsers(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.RepaireStore ORDER BY user_id DESC";
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
                                    user_id = rowData.ElementAtOrDefault(0),
                                    first_name = rowData.ElementAtOrDefault(1),
                                    last_name = rowData.ElementAtOrDefault(2),
                                    email = rowData.ElementAtOrDefault(3),
                                    password = rowData.ElementAtOrDefault(4),
                                    contact = rowData.ElementAtOrDefault(5),
                                    street_address1 = rowData.ElementAtOrDefault(6),
                                    street_address2 = rowData.ElementAtOrDefault(7),
                                    city = rowData.ElementAtOrDefault(8),
                                    state = rowData.ElementAtOrDefault(9),
                                    pincode = rowData.ElementAtOrDefault(10),
                                    country = rowData.ElementAtOrDefault(11),
                                    profile = rowData.ElementAtOrDefault(12)
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
    }
}

