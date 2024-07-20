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

                   var sq = @"INSERT INTO pc_student.BuildHomeEasy
                    (name, image) 
                    VALUES (@name, @image)";


                  MySqlParameter[] insertParams = new MySqlParameter[]
                    {
                        new MySqlParameter("@name", rData.addInfo["name"]),
                        new MySqlParameter("@image", rData.addInfo["image"]),
                        // new MySqlParameter("@items",  JsonSerializer.Serialize(rData.addInfo["items"]))
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

        public async Task<responseData> GetItemByName(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.BuildHomeEasy WHERE name=@name";

                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@name", rData.addInfo["name"]) // Ensure rData contains the id field
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
                                    name = rowData.ElementAtOrDefault(1),
                                    image = rowData.ElementAtOrDefault(2)
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
                                    image = rowData.ElementAtOrDefault(2)
                                    // items = rowData.ElementAtOrDefault(3),
                                    // items = JsonSerializer.Deserialize<object>(rowData.ElementAtOrDefault(3))
                                    
                                   
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

        public async Task<responseData> AddChildItem(requestData rData)
        {
            responseData resData = new responseData();
            try
            {

                 var query = @"SELECT * FROM pc_student.BuildHomeEasyChildItem WHERE name=@name";
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

                    var sq = @"INSERT INTO pc_student.BuildHomeEasyChildItem
                    (itemId, image, name, price, perItem, minQuantity) 
                    VALUES (@itemId, @image, @name, @price, @perItem, @minQuantity)";

                    MySqlParameter[] updateParams = new MySqlParameter[]
                    {
                        new MySqlParameter("@itemId", rData.addInfo["itemId"]),
                        new MySqlParameter("@image", rData.addInfo["image"]),
                        new MySqlParameter("@name", rData.addInfo["name"]),
                        new MySqlParameter("@price", rData.addInfo["price"]),
                        new MySqlParameter("@perItem", rData.addInfo["perItem"]),
                        new MySqlParameter("@minQuantity", rData.addInfo["minQuantity"]),
                    };
                    var insertResult = ds.executeSQL(sq, updateParams);
                  
                    resData.rData["rMessage"] = "Added Successful";

                }
                
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "An error occurred: " + ex.Message;
            }
            return resData;
        }

        public async Task<responseData> GetAllChildItemsById(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.BuildHomeEasyChildItem WHERE itemId=@itemId";

                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@itemId", rData.addInfo["itemId"]) // Ensure rData contains the id field
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
                                    itemId = rowData.ElementAtOrDefault(1),
                                    image = rowData.ElementAtOrDefault(2),
                                    name = rowData.ElementAtOrDefault(3),
                                    price = rowData.ElementAtOrDefault(4),
                                    perItem = rowData.ElementAtOrDefault(5),
                                    minQuantity = rowData.ElementAtOrDefault(6)

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

        public async Task<responseData> UpdateChildItemById(requestData rData)
        {
            responseData resData = new responseData();

            try
            {
                var query = @"SELECT * FROM pc_student.BuildHomeEasyChildItem WHERE name=@name AND id != @id";
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
                    var updateQuery  = @"UPDATE pc_student.BuildHomeEasyChildItem
                            SET image = @image,
                                name = @name, 
                                price=@price,
                                perItem=@perItem,
                                minQuantity=@minQuantity
                            WHERE id = @id";

                    MySqlParameter[] updateParams  = new MySqlParameter[]
                    {

                        new MySqlParameter("@id", rData.addInfo["id"]),
                        new MySqlParameter("@image", rData.addInfo["image"]),
                        new MySqlParameter("@name", rData.addInfo["name"]),
                        new MySqlParameter("@price", rData.addInfo["price"]),
                        new MySqlParameter("@perItem", rData.addInfo["perItem"]),
                        new MySqlParameter("@minQuantity", rData.addInfo["minQuantity"])
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

        public async Task<responseData> DeleteChildItem(requestData rData)
        {
            responseData resData = new responseData();

            try
            {
                // Your delete query
                var query = @"DELETE FROM pc_student.BuildHomeEasyChildItem
                            WHERE id = @id;";

                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@id", rData.addInfo["id"])
                };

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
        public async Task<responseData> DeleteChildItem2(requestData rData)
        {
            responseData resData = new responseData();

            try
            {
                // Your delete query
                var query = @"DELETE FROM pc_student.BuildHomeEasyChildItem
                            WHERE itemId = @itemId;";

                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@itemId", rData.addInfo["itemId"])
                };

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

        public async Task<responseData> GetAllItemName(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT name FROM pc_student.BuildHomeEasy ORDER BY id DESC";
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
                                    name = rowData.ElementAtOrDefault(0),
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


        


      

    }
}