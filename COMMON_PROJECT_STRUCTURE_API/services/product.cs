using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using System.Text.Json;
using System.Data;

namespace COMMON_PROJECT_STRUCTURE_API.services
{
    public class product
    {
        dbServices ds = new dbServices();

        public async Task<responseData> AddItem(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.BuildHomeEasy WHERE name=@name";
                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@name", rData.addInfo["name"])
                };
                var dbData = ds.executeSQL(query, myParam);
                
                if (dbData[0].Count() > 0)
                {
                    resData.rData["rMessage"] = "Duplicate Credentials";
                }
                else
                {

                    var items = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(rData.addInfo["items"].ToString());
                    var itemNames = new HashSet<string>();

                    foreach (var item in items)
                    {
                        if (!itemNames.Add(item["itemName"].ToString()))
                        {
                            resData.rData["rMessage"] = $"Duplicate item name: {item["itemName"]}";
                            return resData;
                        }
                    }

                   var sq = @"INSERT INTO pc_student.BuildHomeEasy
                    (name, image, items) 
                    VALUES (@name, @image, @items)";

                    // if (!decimal.TryParse(rData.addInfo["productPrice"].ToString(), out decimal productPrice))
                    // {
                    //     resData.rData["rMessage"] = "Invalid product price";
                    //     return resData;
                    // }

                  MySqlParameter[] insertParams = new MySqlParameter[]
                    {
                        // new MySqlParameter("@Id", rData.addInfo["id"]),
                        new MySqlParameter("@name", rData.addInfo["name"]),
                        new MySqlParameter("@image", rData.addInfo["image"]),
                        // new MySqlParameter("@ProductPrice",  rData.addInfo["productPrice"]),
                        // new MySqlParameter("@ProductPrice",  productPrice),
                        new MySqlParameter("@items",  JsonSerializer.Serialize(rData.addInfo["items"]))
                        // new MySqlParameter("@ProductDemoText", rData.addInfo["productDemoText"]),
                    };
                    var insertResult = ds.executeSQL(sq, insertParams);

                    resData.rData["rMessage"] = "Added Successful";
                }
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "An error occurred: " + ex.Message;
            }
            return resData;
        }

        public async Task<responseData> AddChildItem(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                   var sq = @"UPDATE pc_student.BuildHomeEasy
                       SET items = JSON_ARRAY_APPEND(items, '$', JSON_OBJECT('itemName', @itemName, 'itemImage', @itemImage, 'itemPrice', @itemPrice))
                       WHERE id = @id";

                    MySqlParameter[] updateParams = new MySqlParameter[]
                    {
                        new MySqlParameter("@id", rData.addInfo["id"]),
                        new MySqlParameter("@itemName", rData.addInfo["itemName"]),
                        new MySqlParameter("@itemImage", rData.addInfo["itemImage"]),
                        new MySqlParameter("@itemPrice", rData.addInfo["itemPrice"]),
                    };
                    var insertResult = ds.executeSQL(sq, updateParams);
                  
                    resData.rData["rMessage"] = "Added Successful";

                    // if (insertResult > 0)
                    // {
                    //     resData.rData["rMessage"] = "Added Successful";
                    // }
                    // else
                    // {
                    //     resData.rData["rMessage"] = "Update failed. No rows affected.";
                    // }
                
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "An error occurred: " + ex.Message;
            }
            return resData;
        }

        public async Task<responseData> GetAllItems(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.BuildHomeEasy ORDER BY id DESC";
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
                                    image = rowData.ElementAtOrDefault(2),
                                    // items = rowData.ElementAtOrDefault(3),
                                    items = JsonSerializer.Deserialize<object>(rowData.ElementAtOrDefault(3))
                                    
                                   
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
        public async Task<responseData> GetAllProductName(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT productName FROM pc_student.RepairStoreProduct ORDER BY id DESC";
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
                                    // id = rowData.ElementAtOrDefault(0),
                                    // productImage = rowData.ElementAtOrDefault(1),
                                    productName = rowData.ElementAtOrDefault(0),
                                    // productPrice = rowData.ElementAtOrDefault(3),
                                    // productDemoImages = rowData.ElementAtOrDefault(4),
                                    // productDemoText = rowData.ElementAtOrDefault(5),
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
        public async Task<responseData> GetProductById(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.RepairStoreProduct WHERE id=@ID";

                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@ID", rData.addInfo["id"]) // Ensure rData contains the id field
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
                                    id = rowData.ElementAtOrDefault(0),
                                    productImage = rowData.ElementAtOrDefault(1),
                                    productName = rowData.ElementAtOrDefault(2),
                                    productPrice = rowData.ElementAtOrDefault(3),
                                    productDemoImages = rowData.ElementAtOrDefault(4),
                                    productDemoText = rowData.ElementAtOrDefault(5),
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

        public async Task<responseData> GetProductByName(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.RepairStoreProduct WHERE productName=@productName";

                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@productName", rData.addInfo["productName"]) // Ensure rData contains the id field
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
                                    id = rowData.ElementAtOrDefault(0),
                                    productImage = rowData.ElementAtOrDefault(1),
                                    productName = rowData.ElementAtOrDefault(2),
                                    productPrice = rowData.ElementAtOrDefault(3),
                                    productDemoImages = rowData.ElementAtOrDefault(4),
                                    productDemoText = rowData.ElementAtOrDefault(5),
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


        public async Task<responseData> UpdateItemById(requestData rData)
        {
            responseData resData = new responseData();

            try
            {
                var query = @"SELECT * FROM pc_student.BuildHomeEasy WHERE name=@name AND id != @id";
                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@name", rData.addInfo["name"]),
                    new MySqlParameter("@id", rData.addInfo["id"])
                };
                var dbData = ds.executeSQL(query, myParam);
                
                if (dbData[0].Count() > 0)
                {
                    resData.rData["rMessage"] = "Duplicate Credentials";
                }
                else
                {
                    var updateQuery  = @"UPDATE pc_student.BuildHomeEasy
                            SET name = @name, 
                                image = @image
                            WHERE id = @id";

                    MySqlParameter[] updateParams  = new MySqlParameter[]
                    {

                        new MySqlParameter("@id", rData.addInfo["id"]),
                        new MySqlParameter("@name", rData.addInfo["name"]),
                        new MySqlParameter("@image", rData.addInfo["image"]),
                        // new MySqlParameter("@items", rData.addInfo["items"])

                    
                    };

                    bool shouldExecuteUpdate = true;

                    if (shouldExecuteUpdate)
                    {
                        int rowsAffected = ds.ExecuteUpdateSQL(updateQuery , updateParams );

                        if (rowsAffected > 0)
                        {
                            resData.rData["rMessage"] = "UPDATE SUCCESSFULLY";
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
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "Exception occurred: " + ex.Message;
            }
            return resData;
        }


        public async Task<responseData> DeleteItem(requestData rData)
        {
            responseData resData = new responseData();

            try
            {
                // Your delete query
                var query = @"DELETE FROM pc_student.BuildHomeEasy
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

    }
}