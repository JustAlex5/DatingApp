using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interface
{
    public interface IMessageRepository
    {
        void AddGroup(Group group);
        void Removeconnection(Connection connection);
        Task<Connection> GetConnections(string connectionId);
        Task<Group> GetMessageGroup(string groupName);
        Task<Group> GetGroupForConnection(string connectionId);
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message> GetMessage(int id);
        Task<PageList<MessageDTO>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<MessageDTO>> GetMessageThread(string currentUsername, string recipientUsername);
        Task<bool> SaveAllAsync();
    }
}