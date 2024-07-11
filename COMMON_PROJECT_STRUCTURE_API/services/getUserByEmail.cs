using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace COMMON_PROJECT_STRUCTURE_API.services
{
    public class getUserByEmail
    {
        dbServices ds = new dbServices();
        public async Task<responseData> GetUserByEmail(string email)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.RepaireStore WHERE email=@Email";
                MySqlParameter[] myParam = new MySqlParameter[] { 
                    new MySqlParameter("@Email", email)
                };

                var dbData = ds.executeSQL(query, myParam); 
                if (dbData.Any())
                {
                    List<string> messages = new List<string>();

                    foreach (var rowSet in dbData)
                    {
                        foreach (var row in rowSet)
                        {
                            List<string> rowData = new List<string>();

                            foreach (var column in row)
                            {
                                rowData.Add(column.ToString());
                            }

                            // Now rowData contains all values from the current row
                            string rowDataString = string.Join(" - ", rowData);
                            messages.Add(rowDataString);
                        }
                    }

                    
                    string userDetails = string.Join(Environment.NewLine, messages);

                    // resData.rData["rMessage"] = $"Retrieved User Details:\n{userDetails}";
                    resData.rData["rMessage"] = userDetails;
                }
                else
                {
                    resData.rData["rMessage"] = "No any details here...";
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